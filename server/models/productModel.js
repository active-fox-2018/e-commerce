const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, 'Product name cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty']
  },
  price: {
    type: Number,
    required: [true, 'Price cannot be empty']
  },
  stock: {
    type: Number,
    required: [true, 'Please input the stock!']
  },
  productImage: String
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;