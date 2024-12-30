const express = require('express');
const router = express.Router();
const {
  getAgencies,
  createAgency,
  getAgencyById,
  updateAgency,
  deleteAgency,
} = require('../controllers/agencyController');
const { protect, countryManager } = require('../middleware/authMiddleware');

// @desc    Get all agencies
// @route   GET /api/agencies
// @access  Private/CountryManager
//router.route('/all').get(protect, countryManager, getAgencies);
//router.route('/all').get(getAgencies);
router.get('/all', protect, getAgencies)

// @desc    Create a new agency
// @route   POST /api/agencies
// @access  Private/CountryManager
//router.route('/').post(protect, countryManager, createAgency);
router.route('/').post(protect, createAgency);

// @desc    Get, update, delete agency by ID
// @route   GET/PUT/DELETE /api/agencies/:id
// @access  Private/CountryManager or AgencyManager
router.route('/:id').get(protect, countryManager, getAgencyById).put(protect, countryManager, updateAgency).delete(protect, countryManager, deleteAgency);
//router.route('/:id').get(getAgencyById).put(updateAgency).delete(deleteAgency);

module.exports = router;
