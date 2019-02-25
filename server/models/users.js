const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPass } = require('../helpers')
const Cart = require('./cart')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'required user name']
    },
    email: {
        type: String,
        required: [true, 'required user email'],
        validate: [{
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
            message: 'invalid email format'
        }, {
            isAsync: true,
            validator: function(v, cb) {
                User
                    .findOne({email: v, _id: {$ne: this._id}})
                    .then(user => {
                        user? cb(false): cb(true)
                    })
                    .catch(err => {
                        cb(false)
                    })
            },
            message: 'email already used'
        }]
    },
    password: {
        type: String,
        required: [true, 'required user password']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    picture: {
        type: String
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPass(this.password)
    next()
})

userSchema.post('save', function(doc, next) {
    Cart
        .create({userId: doc._id})
        .then(cart => {
            next()
        })
        .catch(err => {
            console.log(err);
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User