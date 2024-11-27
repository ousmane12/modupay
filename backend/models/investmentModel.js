const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: false, // Peut être null si c'est pour tous les pays
    },
    amountInvested: {
        type: Number,
        required: true,
    },
    interestPercentage: {
        type: Number, // Pourcentage des gains sur les transactions
        required: true,
        min: 0,
        max: 100,
    },
    totalInterestEarned: {
        type: Number,
        default: 0, // Montant total des intérêts accumulés
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;
