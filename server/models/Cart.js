const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./Product')

const CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product id required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id required']
    },
    qty: {
        type: Number,
        default: 1
    },
    total: {
        type: Number
    },
    checkout: {
        type: Boolean,
        default: false
    }, 
    checkoutDate: {
        type: Date
    },
    recieved: {
        type: Date
    }
}, {
    timestamps: true
})

CartSchema.pre('save', function(next) {
    Product.findById(this.product)
        .then(found => {
            this.total = (found.price * this.qty)
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart