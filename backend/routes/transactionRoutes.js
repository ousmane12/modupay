const express = require('express');
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  completeTransactions,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all transactions (for authorized country or agency)
// @route   GET /api/transactions
// @access  Private/Admin or CountryManager or AgencyManager
//router.route('/all').get(protect, agencyManager, getTransactions);
router.route('').get(protect, getTransactions);

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private/AgencyManager
router.route('').post(protect, createTransaction);
//router.route('').post(createTransaction);

// @desc    Get, update, or delete a transaction by ID
// @route   GET/PUT/DELETE /api/transactions/:id
// @access  Private/AgencyManager or CountryManager or Admin
//router.route('/:id').get(protect, getTransactionById).put(protect, agencyManager, updateTransaction).delete(protect, admin, deleteTransaction);

// @desc    Complete a transaction
// @route   PUT /api/transactions/:id/complete
// @access  Private/AgencyManager
router.route('/:id').put(protect, completeTransactions);

module.exports = router;
