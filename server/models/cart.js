const mongoose = require('mongoose')
const Schema = mongoose.Schema


const cartSchema = new Schema({
  UserId : { type : Schema.Types.ObjectId, ref : 'User'},
  item : {type : Schema.Types.ObjectId, ref : 'Item'},
  quantity : Number,
  CheckOut : { type : Schema.Types.Boolean, default : false}
  })

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart