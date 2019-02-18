const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  subTotal: Number
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;