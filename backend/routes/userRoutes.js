const express = require('express')
const router = express.Router()

const {
  createUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
  deleteUser,
  resetPassword,
  forgotPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', protect, getUsers)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);

module.exports = router