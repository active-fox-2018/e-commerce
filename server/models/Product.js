const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name can't be empty"]
  }, 
  image: {
    type: String,
    required: [true, "Please upload an image of your product"]
  },
  price: {
    type: Number,
    required: [true, "price can't be empty"]
  },
  stock: {
    type: Number, 
    required: [true, "stock can't be empty"]
  },
  imagePreviewURL: {
    type: String
  },
  postedAt: {
    type: Date,
    default: new Date
  }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product

