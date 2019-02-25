const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
  title : {
    type : String,
    minlength : [6, 'minimum length of title is 6 character']
  },
  description : {
    type : String,
    minlength : [20, 'minimum length of description is 20 character']
  },
  image : String,
  stock: {
    type : Number,
    message : 'input must be a number'
  },
  price : Number,
  created_at: Date,
  // seller : { type : Schema.Types.ObjectId, ref : 'User'}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product