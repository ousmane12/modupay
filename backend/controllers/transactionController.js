const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  try {
    // Fetch transactions with population
    const transactions = await Transaction.find({ /* Your query criteria */ })
      .populate('initiatedBy')  // Populate initiatedBy field with all fields
      .populate('sender')       // Populate sender field with all fields
      .populate('receiver')
      .populate('completedBy') 

    // Send the transactions as a response
    res.json(transactions);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
  try {
    if (!req.body.amount) {
      res.status(400);
      throw new Error('Please add the amount field');
    }

    const transactionData = {
      amount: req.body.amount,
      amountConverted: req.body.amountConverted,
      initiatedBy: req.user.id,
    };

    // Add sender and receiver only if they are provided and not empty
    if (req.body.sender && req.body.sender !== '') {
      transactionData.sender = new mongoose.Types.ObjectId(req.body.sender);
    }

    if (req.body.receiver && req.body.receiver !== '') {
      transactionData.receiver = new mongoose.Types.ObjectId(req.body.receiver);
    }

    const transaction = await Transaction.create(transactionData);

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(400);
    throw new Error('Transaction not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged-in user matches the transaction user
  /* if (
    transaction.initiatedBy.toString() !== req.user.id ||
    transaction.completedBy.toString() !== req.user.id
  ) {
    res.status(401);
    throw new Error('User not authorized');
  } */

  // Extract the status from req.body
  const { status } = req.body;

  // Check if status is provided in the request body
  if (status === undefined) {
    res.status(400);
    throw new Error('Status is required for update');
  }

  // Update only the status field
  transaction.status = status;

  // Save the updated transaction
  const updatedTransaction = await transaction.save();

  res.status(200).json(updatedTransaction);
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)

  if (!transaction) {
    res.status(400)
    throw new Error('Transaction not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the transaction user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await transaction.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
}