const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'product name required']
    },
    price: {
        type: Number,
        required: [true, 'product price required']
    },
    stock: {
        type: Number,
        required: [true, 'product stock required']
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    image: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product