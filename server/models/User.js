const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { genPass } = require('../helpers')

function checkUniqueEmail() {
    return new Promise((res, rej) =>{
        User.findOne({email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if(data) {
                    res(false)
                } else {
                    res(true)
                }
            })
            .catch(err => {
                res(false)
            })
    })
}

function checkUniquePhone() {
    return new Promise((res, rej) =>{
        User.findOne({phone: this.phone, _id: { $ne: this._id } })
            .then(data => {
                if(data) {
                    res(false)
                } else {
                    res(true)
                }
            })
            .catch(err => {
                res(false)
            })
    })
}


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, `Email required`],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [checkUniqueEmail, 'Email already taken']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        // validate: [checkUniquePhone, `Phone number already taken`],
        // required: [true, `Phone number required`]
    },
    role: {
        type: String,
        default: 'cust',
        enum: ['admin', 'cust']
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    if (!this.hasOwnProperty('useOldPassword')) {
        this.password = genPass(this.password)
    }
    next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User