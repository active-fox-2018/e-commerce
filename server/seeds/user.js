const models = require('../models')
const mongoose = require('mongoose')
require('dotenv').config()

let mongodb_srv = process.env.MONGODB_SRV || 'mongodb://localhost/h8-p2-portocombo1'
mongoose.connect(mongodb_srv, { useNewUrlParser: true })

models.User.findOne({ email: 'admin@example.com' })
    .then(userData => {
        if (userData) {
            userData.role = 'admin'
            userData.save()
            return models.User.findOne({ email: 'admin@example.com' })
        } else {
            return models.User.create({
                name: 'admin',
                password: 'admin',
                email: 'admin@example.com',
                role: 'admin',
            })
        }
    })
    .then(userData => {
        console.log('created an admin user with email : ', userData.email)
    })
