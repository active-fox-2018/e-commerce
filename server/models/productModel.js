const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  productName: String,
  price: Number,
  stock: Number,
  productImage: String
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;