const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date
    } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product