const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please fill up product's name"]
    },
    price: {
        type: Number,
        required: [true, "Please fill up product's price"]
    },
    stock: {
        type: Number,
        required: [true, "Please fill up product's stock"]
    },
    image: String,
    description: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product

