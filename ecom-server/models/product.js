const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : {
        type : String,
        required : [true, `name must be filled`]
    },
    image : {
        type : String,
        default : ''
    },
    description : {
        type : String,
        required : [true, `description must be filled`]
    },
    amount : {
        type : Number,
        default : 1
    },
    price : {
        type : Number,
        required : [true, `price must be filled`]
    }
    // cartId: [{ type: Schema.Types.ObjectId, ref: 'Cart' }]
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product