const express = require('express');
const {
  createInvestment,
  getInvestmentById,
  getInvestments,
  updateInvestment,
  deleteInvestment,
} = require('../controllers/investmentController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getInvestments)
  .post(protect, admin, createInvestment);

router.route('/:id')
  .get(protect, getInvestmentById)
  .put(protect, admin, updateInvestment)
  .delete(protect, admin, deleteInvestment);

module.exports = router;
