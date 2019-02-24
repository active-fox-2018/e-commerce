const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  userId: {
    type: String,
    ref: 'User'
  },
  cartId: {
    type: String, 
    ref: 'Cart'
  },
  totalPrice: Number,
  status: {
    type: String, 
    default: 'Products on delivery'
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  finalPrice: Number
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction
