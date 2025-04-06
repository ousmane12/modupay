const asyncHandler = require('express-async-handler')
const Expense = require('../models/expenseModel');
const Country = require('../models/countryModel');
const Agency = require('../models/agencyModel');

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { label, amount, country, agency } = req.body;

  // Vérifier si l'utilisateur est authentifié
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  // Si l'utilisateur est admin, il peut spécifier country et agency dans le body
  if (req.user.role === 'admin') {
    if (!country || !agency) {
      return res.status(400).json({ message: 'Un admin doit choisir le pays et une agence' });
    }
    const expense = new Expense({
      spender: req.user._id,
      label,
      amount,
      country,
      agency,
    });
  
    const createdExpense = await expense.save();
  
    // Ajouter l'ID de la transaction aux champs `expenses` de Country et Agency
    await Country.findByIdAndUpdate(expenseCountry, {
      $push: { expenses: createdExpense._id },
    });
  
    await Agency.findByIdAndUpdate(expenseAgency, {
      $push: { expenses: createdExpense._id },
    });
  
    // Retourner la transaction créée
    res.status(201).json(createdExpense);
  } else {
    // Pour les autres utilisateurs, on récupère ces informations depuis leur profil
    if (!req.user.country || !req.user.agency) {
      return res.status(400).json({ message: 'Vous devez appartenir a une agence ou un pays' });
    }
    const expense = new Expense({
      spender: req.user._id,
      label,
      amount,
      country: req.user.country,
      agency: req.user.agency,
    });
  
    const createdExpense = await expense.save();
  
    // Ajouter l'ID de la transaction aux champs `expenses` de Country et Agency
    await Country.findByIdAndUpdate(expenseCountry, {
      $push: { expenses: createdExpense._id },
    });
  
    await Agency.findByIdAndUpdate(expenseAgency, {
      $push: { expenses: createdExpense._id },
    });
  
    // Retourner la transaction créée
    res.status(201).json(createdExpense);
  }
});

// @desc    Get transactions for a specific agency or country
// @route   GET /api/transactions
// @access  Private (Agency Manager or Country Manager)
const getExpenses = asyncHandler(async (req, res) => {
  try {
    let query = Expense.find();

    // Filtrer en fonction du rôle de l'utilisateur
    switch (req.user.role) {
      case 'admin':
        // Admin : retourne toutes les transactions
        break;
      case 'controller':
        // Admin : retourne toutes les transactions
        break;
      
      case 'country_manager':
        // Country Manager : retourne les transactions pour le pays de l'utilisateur
        if (!req.user.country) {
          return res.status(400).json({ message: "Country not specified for user." });
        }
        query = query.where('country').equals(req.user.country);
        break;
      
      case 'agency_manager':
        // Agency Manager : retourne les transactions pour l'agence de l'utilisateur
        if (!req.user.agency) {
          return res.status(400).json({ message: "Agency not specified for user." });
        }
        query = query.where('agency').equals(req.user.agency);
        break;
      
      case 'agent':
        // Agent : retourne uniquement les transactions où l'agent est le `sender`
        query = query.where('sender').equals(req.user._id);
        break;
      
      default:
        return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Peupler les relations
    const expenses = await query
      .populate('spender', 'name')
      .populate('agency', 'name')
      .populate('country', 'name');

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des transactions' });
  }
});

module.exports = {
  getExpenses,
  createExpense,
}