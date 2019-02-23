const { hashingPw } = require('../helpers/hashPw') 

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return User.findOne({email : email, _id: {$ne: this._id}})
                    .then(user => {
                        if(user) throw 'Email has been used'
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'min password length are 5 character']
    },
    role: {
        type: String,
        default: 'buyer'
    },
    // address: {
    //     type: String,
    //     required: true
    // },
})

userSchema.pre('save', function(next) {
    this.password = hashingPw(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User