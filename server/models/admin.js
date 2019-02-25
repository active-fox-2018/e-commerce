const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/bcryptjs')

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    }
})

adminSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

adminSchema.post('save', function(admin) {
    admin.password = encrypt(admin.password)
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin