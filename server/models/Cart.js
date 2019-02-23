const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = require('../models/Product')

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    qty: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

cartSchema.pre('save', function(next) {
    Product
        .findById(this.productId)
        .then(product => {
            this.totalPrice = this.qty * product.price
            next()
        })
        .catch(err => {
            throw err
        })
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart