const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Password = require('../helpers/password-encrypt-decrypt')

const AdminSchema = new Schema({
    username: {
        type: String,
        unique: [true, "Username has been used"]
    },
    password: {
        type: String,
        minlength: [6, "Password should contain at least 6 characters"]
    }
})

AdminSchema.pre('save', function() {
    this.password = Password.hashPassword(this.password)
})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin