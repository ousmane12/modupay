const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  localFeePercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  intFeePercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  manager: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
    },
  agencies: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Agency',
      },
  ],
  transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
  ],
  partners: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liste des partenaires pour ce pays
    },
  ],
  expenses: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
    },
  ], 
}, { timestamps: true });

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
