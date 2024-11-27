const express = require('express');
const router = express.Router();
const {
  getCountries,
  createCountry,
  getCountryById,
  updateCountry,
  deleteCountry,
} = require('../controllers/countryController');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all countries
// @route   GET /api/countries
// @access  Private/Admin
//router.route('/all').get(protect, admin, getCountries);
router.route('/all').get(protect, getCountries);

// @desc    Create a new country
// @route   POST /api/countries
// @access  Private/Admin
//router.route('/').post(protect, admin, createCountry);
//router.route('/').post(createCountry);
router.post('/', protect, createCountry)

// @desc    Get, update, delete country by ID
// @route   GET/PUT/DELETE /api/countries/:id
// @access  Private/Admin
//router.get('/:id', protect, getCountryById)
router.route('/:id').get(protect, getCountryById).put(protect, updateCountry).delete(protect, deleteCountry);
//router.route('/:id').get(getCountryById).put(updateCountry).delete(deleteCountry);

module.exports = router;
