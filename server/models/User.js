const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPW } = require('../helpers/bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username cant be empty'],
    validate: {
      isAsync: true,
        validator: (value, callback) => {
          User
            .findOne({
              username: value
            })
            .then(user => {
              if (user) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: "this username is taken. please use another username."
    }
  },
  email: {
    type: String,
    required: [true, 'email cant be empty'],
    validate: [
      {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
        },
        msg: "invalid email format"
      },
      {
        isAsync: true,
        validator: (value, callback) => {
          User
            .findOne({
              email: value
            })
            .then(user => {

              if (user) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: "this email is taken. please use another email."
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'password cant be empty'],
    minlength: [6, "password must be at least 6 character long"]
  },
  role: {
    type: String,
    default: "user"
  },
  cart: [{type: Schema.Types.ObjectId, ref: "Product"}],
  source: String
})

UserSchema.pre('save', function (next) {
  this.password = hashPW(this)
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User