const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      qty: Number
  }],
  total: Number,
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: new Date
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction