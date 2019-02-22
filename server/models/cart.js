const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    amount: Number,
})

const Cart = mongoose.model('carts', cartSchema)

module.exports = Cart
