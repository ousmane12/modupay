const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    },
    manager: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    agents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense',
        },
      ],
}, { timestamps: true });

const Agency = mongoose.model('Agency', agencySchema);
module.exports = Agency;
