const asyncHandler = require('express-async-handler')
const Transaction = require('../models/transactionModel')
const Country = require('../models/countryModel')
const User = require('../models/userModel')
const Agency = require('../models/agencyModel')
const Investment = require('../models/investmentModel')

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = asyncHandler(async (req, res) => {
  const { receiverName, receiverPhone, country, agency, transferType, amount } = req.body;

  // Vérifier si l'utilisateur est authentifié et a le droit d'initier une transaction
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  // Trouver les frais pour le pays du destinataire
  const feeInfo = await Country.findById(country);

  if (!feeInfo) {
    return res.status(404).json({ message: 'Informations sur les frais pour ce pays introuvables' });
  }

  // Calcul des frais arrondis à deux chiffres après la virgule
  const fee = transferType === "national"
    ? Math.round(((feeInfo.localFeePercentage / 100) * amount) * 100) / 100
    : Math.round(((feeInfo.intFeePercentage / 100) * amount) * 100) / 100;

  // Calcul du montant total
  const totalAmount = Number(amount) + fee;

  // Création de la transaction
  const transaction = new Transaction({
    sender: req.user._id,
    receiverName,
    receiverPhone,
    country,
    agency,
    transferType,
    amount,
    fee,
    amountTotal: totalAmount,  // Le montant total est bien calculé ici
  });
  const createdTransaction = await transaction.save();

  // Ajouter l'ID de la transaction aux champs `transactions` de Country et Agency
  await Country.findByIdAndUpdate(country, {
    $push: { transactions: createdTransaction._id }
  });

  await Agency.findByIdAndUpdate(agency, {
    $push: { transactions: createdTransaction._id }
  });

  // Récupérer les utilisateurs concernés
  const admins = await User.find({ role: 'admin' });
  const countryManagers = await User.find({ role: 'country_manager', country });
  const agencyManagers = await User.find({ role: 'agency_manager', agency });

  const emails = [
    ...admins.map(user => user.email),
    ...countryManagers.map(user => user.email),
    ...agencyManagers.map(user => user.email),
  ];

  try {
    const sendEmail = require('../utils/sendEmail');
    await sendEmail({
      to: emails,
      subject: 'Nouvelle transaction créée',
      text: `Une nouvelle transaction a été créée :
          - Nom du destinataire : ${receiverName}
          - Téléphone du destinataire : ${receiverPhone}
          - Montant : ${amount} (Total avec frais : ${totalAmount})
          - Type de transfert : ${transferType}
          - Agence : ${agency}
          - Pays : ${country}

          Consultez l'application pour plus de détails.`,
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
    
  } finally {
    res.status(201).json(createdTransaction);
  }
});

// @desc    Get transactions for a specific agency or country
// @route   GET /api/transactions
// @access  Private (Agency Manager or Country Manager)
const getTransactions = asyncHandler(async (req, res) => {
  try {
    let query = Transaction.find();

    // Filtrer en fonction du rôle de l'utilisateur
    switch (req.user.role) {
      case 'admin':
        // Admin : retourne toutes les transactions
        break;
      
      case 'country_manager':
        // Country Manager : retourne les transactions pour le pays de l'utilisateur
        if (!req.user.country) {
          return res.status(400).json({ message: "Pays non spécifié pour l'utilisateur." });
        }
        query = query.where('country').equals(req.user.country);
        break;
      
      case 'agency_manager':
        // Agency Manager : retourne les transactions pour l'agence de l'utilisateur
        if (!req.user.agency) {
          return res.status(400).json({ message: "Agence non spécifiée pour l'utilisateur." });
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
    const transactions = await query
      .populate('country', 'name')
      .populate('agency', 'name')
      .populate('completedBy', 'name')
      .populate('sender', 'name');

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des transactions' });
  }
});

// @desc    Complete a transaction
// @route   PUT /api/transactions/:id/complete
// @access  Private (Agency Manager)
const completeTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  const { status } = req.body;
  if (status === undefined) {
    res.status(400);
    throw new Error('Le statut est requis pour la mise à jour');
  }

  transaction.status = status;
  transaction.completedBy = req.body.completedBy;
  transaction.completedAt = Date.now();

  const updatedTransaction = await transaction.save();

  res.status(200).json(updatedTransaction);
});

const completeTransactions = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
        .populate('country')
        .populate('agency');
    if(!transaction) {
        throw new Error('Transaction introuvable');
    }
    if (transaction.status === 'completed') {
        throw new Error('Transaction déjà complétée');
    }
    const { status } = req.body;
    
    transaction.status = status;
    transaction.completedAt = new Date();
    transaction.completedBy = req.body.completedBy;
    await transaction.save();

    // Calculer les intérêts pour chaque partenaire
    if(status === 'completed') {
      const investments = await Investment.find({ country: transaction.country._id });

      for (const investment of investments) {
          const interest = (transaction.amount * investment.interestPercentage) / 100;
          investment.totalInterestEarned += interest;
          await investment.save();
      }
    }

    res.status(200).json(transaction);
});


module.exports = {
  getTransactions,
  createTransaction,
  completeTransaction,
  completeTransactions,
}