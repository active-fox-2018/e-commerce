const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    items: [{
        product: {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            name: String,
            price: Number,
        },
        amount: Number,
    }],
    date: Date,
    status: String,
})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction
