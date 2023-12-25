const express = require('express')
const { setTransaction, updateTransaction, deleteTransaction, getTransactions } = require('../controllers/transactionController')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTransactions).post(protect, setTransaction)
router.route('/:id').delete(protect, deleteTransaction).put(protect, updateTransaction)

module.exports = router