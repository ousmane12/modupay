const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all transactions (for authorized country or agency)
// @route   GET /api/transactions
// @access  Private/Admin or CountryManager or AgencyManager
//router.route('/all').get(protect, agencyManager, getExpenses);
router.route('').get(protect, getExpenses);

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private/AgencyManager
router.route('').post(protect, createExpense);
//router.route('').post(createExpense);

// @desc    Get, update, or delete a transaction by ID
// @route   GET/PUT/DELETE /api/transactions/:id
// @access  Private/AgencyManager or CountryManager or Admin
//router.route('/:id').get(protect, getExpenseById).put(protect, agencyManager, updateExpense).delete(protect, admin, deleteExpense);


module.exports = router;
