const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price required']
    },
    image: {
        type: String
    },
    qty: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product