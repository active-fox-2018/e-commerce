const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
              msg: "Incorrect email format"
            }, {
              isAsync: true,
              validator: function(v, cb) {
                User.findOne({
                    email: v
                })
                .then(user => {
                    if(user && user._id.toString() != this._id.toString()) {
                      cb(false)
                    } else {
                      cb(true)
                    }
                })
                .catch( (err) => {
                    throw err
                })
              },
              msg: "Email is already been used"
        }]
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }
})

userSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

userSchema.post('save', function(user) {
    user.password = encrypt(user.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User