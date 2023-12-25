const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    initiatedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    completedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    status: { 
      type: String, 
      enum: ['pending', 'completed'], 
      default: 'pending' 
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount value'],
    },
    sender: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'User', 
      required: true 
    },
    receiver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)