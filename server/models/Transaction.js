const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    qty: Number,
    totalPrice: Number,
    status: String,
}, {timestamps: true})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction