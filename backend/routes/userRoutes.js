const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', protect, getUsers)
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser)

module.exports = router