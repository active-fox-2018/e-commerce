const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: String,
    stock: Number,
    img: String
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product