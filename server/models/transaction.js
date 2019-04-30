const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: {
    type: Array,
  },
  totalPrice: Number,
  status: {
    type: String,
    enum: [
      'ready',
      'shipping',
      'arrived'
    ]
  },
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;