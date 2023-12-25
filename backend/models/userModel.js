const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    email: {
      type: String,
      unique: true,
    },
    login: {
        type: String,
        unique: true,
    },
    password: {
      type: String,
    },
    role: { 
        type: String, 
        enum: ['admin', 'manager', 'user'], 
        required: true 
    },
    /* manager: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, */
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)