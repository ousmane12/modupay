const asyncHandler = require('express-async-handler')
const Investment = require('../models/investmentModel')
const User = require('../models/userModel')
const Country = require('../models/countryModel')

const createInvestment = asyncHandler(async (req, res) => {
  const { name, phoneNumber, email, selectedCountries, amountInvested, interestPercentage } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to create an investment' });
  }

  // Vérifier les champs requis
  if (!name || !email || !phoneNumber || !selectedCountries || !amountInvested || !interestPercentage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Générer un mot de passe temporaire
  const temporaryPassword = Math.random().toString(36).slice(-8);

  // Créer un utilisateur avec le rôle 'partner'
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password: temporaryPassword, // Stocker un mot de passe temporaire (à hacher dans un hook ou middleware)
    role: 'partner',
    investments: [], // Initialiser un tableau vide pour les investissements
  });

  // Envoyer un e-mail au nouveau partenaire avec le mot de passe temporaire
  try {
    const sendEmail = require('../utils/sendEmail');
    await sendEmail({
      to: email,
      subject: 'Bienvenue en tant que partenaire',
      text: `Bonjour ${name},\n\nVotre compte partenaire a été créé avec succès. Voici vos informations de connexion :\n\nEmail: ${email}\nMot de passe temporaire: ${temporaryPassword}\n\nVeuillez changer votre mot de passe dès votre première connexion.\n\nMerci !`,
    });
  } catch (error) {
    // Supprimer l'utilisateur si l'envoi d'e-mail échoue
    await user.deleteOne();
    console.error('Email Error:', error);
    return res.status(500).json({ message: 'Échec de l\'envoi de l\'e-mail, utilisateur non créé' });
  }

  // Créer un investissement pour chaque pays sélectionné
  const investments = await Promise.all(
    selectedCountries.map(async (countryId) => {
      // Ajouter le partenaire à la liste des partenaires du pays
      const country = await Country.findById(countryId);

      if (!country) {
        throw new Error(`Pays avec l'ID ${countryId} introuvable`);
      }

      if (!country.partners.includes(user._id)) {
        country.partners.push(user._id);
        await country.save();
      }

      // Créer l'investissement
      const investment = await Investment.create({
        partner: user._id,
        country: countryId,
        amountInvested,
        interestPercentage,
      });

      // Ajouter l'investissement au tableau d'investissements de l'utilisateur
      user.investments.push(investment._id);

      return investment;
    })
  );

  // Sauvegarder les investissements sur l'utilisateur
  await user.save();

  res.status(201).json({
    message: 'Partenaire et investissement(s) créés avec succès',
    user,
    investments,
  });
});

const getInvestmentById = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id)
    .populate('partner', 'name email phoneNumber')
    .populate('country', 'name');

  if (!investment) {
    return res.status(404).json({ message: 'Investment not found' });
  }

  // Restriction d'accès
  if (req.user.role === 'partner' && investment.partner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Non autorisé à visualiser cet investissement' });
  }

  res.json(investment);
});


const getInvestments = asyncHandler(async (req, res) => {
  let filter = {};

  if (req.user.role === 'partner') {
    filter.partner = req.user._id; // Filtrer les investissements du partenaire connecté
  }

  const investments = await Investment.find(filter)
    .populate('partner', 'name email phoneNumber')
    .populate('country', 'name');

  res.status(200).json(investments);
});


const updateInvestment = asyncHandler(async (req, res) => {
  const { amountInvested, interestPercentage } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Non autorisé à modifier des investissements' });
  }

  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    return res.status(404).json({ message: 'Investment not found' });
  }

  investment.amountInvested = amountInvested || investment.amountInvested;
  investment.interestPercentage = interestPercentage || investment.interestPercentage;

  const updatedInvestment = await investment.save();
  res.json(updatedInvestment);
});


const deleteInvestment = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Non autorisé à supprimer des investissements' });
  }

  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    return res.status(404).json({ message: 'Investissement introuvable' });
  }

  await investment.remove();
  res.json({ message: 'Investissement supprimé' });
});

  
  module.exports = {
    createInvestment,
    getInvestmentById,
    getInvestments,
    updateInvestment,
    deleteInvestment,
  }