const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId : { type : Schema.Types.ObjectId, ref: 'User'},
  products : [{
    productId : {
      type : Schema.Types.ObjectId, ref: 'Product',
    },
    quantity : {
      type : Number,
    },
  }],
  totalPrice : {
    type : Number,
    default : 0,
  },
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart