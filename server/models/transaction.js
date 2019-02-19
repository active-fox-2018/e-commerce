const mongoose = require('mongoose')
const Schema = mongoose.Schema


const transactionSchema = new Schema({
  totalPrice : Number,
  status : {
    type : String,
    enum : ['incomplete', 'paid' ,'confirmed']
  },
  CartId : [{ type : Schema.Types.ObjectId, ref :'Cart'}],
  UserID :  { type : Schema.Types.ObjectId, ref :'User'},
  created_at : Date,
  updated_at : Date
  })

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction