const asyncHandler = require('express-async-handler')
const Country = require('../models/countryModel');
const Agency = require('../models/agencyModel');
const User = require('../models/userModel')

// @desc    Create a new country
// @route   POST /api/countries
// @access  Private (Admin only)
const createCountry = asyncHandler(async (req, res) => {
  const { name, manager, localFeePercentage, intFeePercentage } = req.body;

  try {
    // Créer un nouveau pays
    const country = new Country({
      name,
      manager,
      localFeePercentage,
      intFeePercentage
    });

    // Sauvegarder le pays
    const createdCountry = await country.save();

    // Mettre à jour l'utilisateur manager pour associer le pays
    if (manager) {
      await User.findByIdAndUpdate(manager, { country: createdCountry._id });
    }

    // Retourner le pays créé
    res.status(201).json(createdCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du pays' });
  }
});

// @desc    Get all countries
// @route   GET /api/countries
// @access  Private (Admin only)
const getCountries = asyncHandler(async (req, res) => {
  // Vérifier si l'utilisateur est un country_manager
  if (req.user.role === 'country_manager') {
    // Si l'utilisateur est un country_manager, on lui retourne seulement son pays
    const country = await Country.findOne({ manager: req.user._id })
      .populate('manager', 'name') // Remplit les détails du manager
      .populate('agencies', 'name')
      .populate('partners', 'name')
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

    if (!country) {
      return res.status(404).json({ message: 'Country not found for this manager' });
    }

    return res.status(200).json(country); // Retourne seulement le pays associé à ce manager
  }

  // Si l'utilisateur n'est pas un country_manager, on retourne tous les pays
  const countries = await Country.find()
    .populate('manager', 'name')
    .populate('agencies', 'name')
    .populate('partners', 'name')
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
      select: 'sender receiverName receiverPhone amount fee amountTotal completedBy transferType initiatedAt completedAt',
      populate: [
        { path: 'sender', select: 'name email phoneNumber' },
        { path: 'agency', select: 'name' },
        { path: 'country', select: 'name' },
        { path: 'completedBy', select: 'name email phoneNumber' }
      ]
    });

  res.status(200).json(countries); // Retourne tous les pays si l'utilisateur est un admin ou autre rôle
});

// @desc    Get a country by ID
// @route   GET /api/countries/:id
// @access  Private (Admin only)
const getCountryById = asyncHandler(async (req, res) => {

  const country = await Country.findById(req.params.id)
        .populate('manager', 'name');

  if (!country) {
    return res.status(404).json({ message: 'Country not found' });
  }

  // Vérifie que l'utilisateur est bien attaché au `req`
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Vérifie si l'utilisateur a le rôle adéquat
  if (req.user.role !== 'country_manager' || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to view this country' });
  }

  res.json(country);
});

// @desc    Update a country
// @route   PUT /api/countries/:id
// @access  Private (Admin only)
const updateCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    return res.status(404).json({ message: 'Country not found' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update this country' });
  }

  // Mettre à jour le pays
  country.name = req.body.name || country.name;
  country.code = req.body.code || country.code;

  const updatedCountry = await country.save();

  res.json(updatedCountry);
});

// @desc    Delete a country
// @route   DELETE /api/countries/:id
// @access  Private (Admin only)
const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    return res.status(404).json({ message: 'Country not found' });
  }

  // Vérifier si l'utilisateur est autorisé à supprimer le pays
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this country' });
  }

  // Supprimer le `country_manager` associé à ce pays, s'il existe
  const countryManager = await User.findOne({ role: 'country_manager', country: country._id });
  if (countryManager) {
    // Supprimer les `agency_manager` et les `agents` associés à ce `country_manager`
    const agencies = await Agency.find({ country: country._id });
    for (const agency of agencies) {
      // Supprimer tous les agents associés à cette agence
      await User.deleteMany({ agency: agency._id });
    }

    // Supprimer les agences du pays
    await Agency.deleteMany({ country: country._id });

    // Supprimer le `country_manager`
    await countryManager.deleteOne();
  }

  // Supprimer le pays lui-même
  await country.deleteOne();

  res.status(200).json({ message: 'Country and related entities removed' });
});


module.exports = {
  getCountries,
  deleteCountry,
  updateCountry,
  getCountryById,
  createCountry,
}