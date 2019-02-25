const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const TransactionSchema = new Schema({
    buyer: {
        type: ObjectId,
        ref: "User"
    },
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    status: {
        type: String,
        default: "On Process"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema)

module.exports = Transaction