const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'country_manager', 'agency_manager', 'agent', 'partner'],
        default: 'agent',
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    },
    investments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Investment',
      },
  ],
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
}, { timestamps: true });

// Hook before saving the user to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Générer un token de réinitialisation
userSchema.methods.getResetPasswordToken = function () {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Ajouter le token au modèle
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1500; // Expire après 10 minutes

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
