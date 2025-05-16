const asyncHandler = require('express-async-handler')
const Agency = require('../models/agencyModel')
const User = require('../models/userModel')
const Country = require('../models/countryModel')

// @desc    Create a new agency
// @route   POST /api/agencies
// @access  Private (Country Manager only)
const createAgency = asyncHandler(async (req, res) => {
  const { name, manager, country } = req.body;

  try {
    // Vérifier si l'utilisateur est un country manager ou un admin
    if (req.user.role !== 'country_manager' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Seuls les country managers et les administrateurs peuvent créer des agences',
      });
    }

    // Vérifier que le manager est un utilisateur valide
    if (manager) {
      const user = await User.findById(manager);

      if (!user) {
        return res.status(400).json({ message: 'Manager non trouvé.' });
      }

      /* if (user.role !== 'agency_manager') {
        return res.status(400).json({
          message: 'Le manager spécifié doit avoir le rôle "agency_manager".',
        });
      } */
    }

    // Définir le champ `country` en fonction du rôle de l'utilisateur
    const countryId = req.user.role === 'country_manager' ? req.user.country : country;

    if (!countryId) {
      return res.status(400).json({
        message: 'Un pays doit être spécifié ou déterminé automatiquement.',
      });
    }

    // Créer la nouvelle agence
    const agency = new Agency({
      name,
      manager,
      country: countryId,
      createdBy: req.user._id,
    });

    // Sauvegarder l'agence
    const createdAgency = await agency.save();

    // Ajouter l'agence à la liste des agences du pays correspondant
    await Country.findByIdAndUpdate(
      countryId,
      { $push: { agencies: createdAgency._id } },
      { new: true, useFindAndModify: false }
    );

    // Mettre à jour le manager pour associer l'agence nouvellement créée
    if (manager) {
      await User.findByIdAndUpdate(manager, { agency: createdAgency._id });
    }

    // Retourner l'agence créée
    res.status(201).json(createdAgency);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'agence' });
  }
});
  
// @desc    Get all agencies for a country
// @route   GET /api/agencies
// @access  Private (Country Manager only)
const getAgencies = asyncHandler(async (req, res) => {
  try {
    let query = {};

    const agencies = await Agency.find(query)
      .populate('country') // Remplit les détails du pays
      .populate('manager', 'name email') // Remplit les détails du manager
      .populate('agents', 'name email')
      .populate({
        path: 'expenses',
        select: 'spender amount label createdAt', // Sélectionne les champs des transactions
        populate: [
          { path: 'spender', select: 'name email phoneNumber' },
          { path: 'agency', select: 'name' },
        ]
      })
      .populate({
        path: 'transactions',
        select: 'sender receiverName receiverPhone amount fee amountTotal completedBy transferType initiatedAt completedAt', // Sélectionne les champs des transactions
        populate: [
          { path: 'sender', select: 'name email phoneNumber' },
          { path: 'agency', select: 'name' },
          { path: 'country', select: 'name' },
          { path: 'completedBy', select: 'name email phoneNumber' }
        ]
      });

    res.status(200).json(agencies); // Retourne les agences en fonction du rôle
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des agences' });
  }
});

// @desc    Get an agency by ID
// @route   GET /api/agencies/:id
// @access  Private (Country Manager and Agency Manager)

const getAgencyById = asyncHandler(async (req, res) => {
  // Approche alternative en utilisant Mongoose populate
  const agency = await Agency.findById(req.params.id);

  if (!agency) {
    return res.status(404).json({ message: 'Agency not found' });
  }

  // Vérifier si l'utilisateur est autorisé à voir cette agence
  if (req.user.role === 'country_manager' && agency.country.toString() !== req.user.country.toString()) {
    return res.status(403).json({ message: 'Not authorized to view this agency' });
  }

  if (req.user.role === 'agency_manager' && agency._id.toString() !== req.user.agency.toString()) {
    return res.status(403).json({ message: 'Not authorized to view this agency' });
  }

  // Trouver le manager de l'agence avec populate
  const agencyWithManager = await Agency.findById(req.params.id).lean();
  
  // Recherche du manager associé
  const manager = await User.findOne(
    { role: 'agency_manager', agency: agency._id },
    'name phoneNumber email'  // Vous pouvez ajouter d'autres champs si nécessaire
  ).lean();

  // Ajouter le manager à l'objet agence
  agencyWithManager.manager = manager || null;

  res.json(agencyWithManager);
});

// @desc    Update an agency
// @route   PUT /api/agencies/:id
// @access  Private (Country Manager or Agency Manager)
const updateAgency = asyncHandler(async (req, res) => {
    const agency = await Agency.findById(req.params.id);
  
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
  
    // Vérifier si l'utilisateur est autorisé à modifier cette agence
    if (req.user.role === 'country_manager' && agency.country.toString() !== req.user.country.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this agency' });
    }
  
    if (req.user.role === 'agency_manager' && agency._id.toString() !== req.user.agency.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this agency' });
    }
  
    // Mettre à jour l'agence
    agency.name = req.body.name || agency.name;
    agency.location = req.body.location || agency.location;
  
    const updatedAgency = await agency.save();
  
    res.json(updatedAgency);
  });

// @desc    Delete an agency
// @route   DELETE /api/agencies/:id
// @access  Private (Country Manager only)
const deleteAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.params.id);

  if (!agency) {
    return res.status(404).json({ message: 'Agency not found' });
  }

  // Vérifier si l'utilisateur est un admin ou un country manager autorisé
  if (
    req.user.role !== 'admin' && 
    !(req.user.role === 'country_manager' && agency.country.toString() === req.user.country.toString())
  ) {
    return res.status(403).json({ message: 'Not authorized to delete this agency' });
  }

  // Supprimer le `agency_manager` associé à cette agence
  await User.deleteOne({ role: 'agency_manager', agency: agency._id });

  // Supprimer tous les `agents` associés à cette agence
  await User.deleteMany({ role: 'agent', agency: agency._id });

  // Supprimer l'agence elle-même
  await agency.deleteOne();

  res.status(200).json({ message: 'Agency, its manager, and agents removed' });
});
  
  module.exports = {
    getAgencies,
    getAgencyById,
    createAgency,
    updateAgency,
    deleteAgency,
  }