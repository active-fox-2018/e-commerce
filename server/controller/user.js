const User = require('../models/users')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class userController {
    static create(req, res) {
        Cart   
            .create({})
            .then(cart => {
                return User
                .create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    cart : cart._id
                    // role: req.body.role
                })
                .then(data => {
                    res.status(201).json(data)
            })
       
            })
            .catch(err => {
                let path = Object.keys(err.errors)
                res.status(400).json({ error: err.errors[path[0]].message.slice(0, err.errors[path[0]].message.length - 1) })

            })
    }

    static login(req, res) {
        let user = ''
        User
            .findOne({
                email: req.body.email
            })
            .then(userLogin => {
                if (userLogin) {
                    user = userLogin
                    return bcrypt.compare(req.body.password, user.password)
                        .then(response => {
                            console.log(response, "===================");

                            if (response) {
                                res.status(200).json({
                                    user: user,
                                    token: jwt.sign({
                                        id: user._id,
                                        email: user.email,
                                        role: user.role
                                    }, process.env.JWTTOKEN)
                                })
                            } else {
                                res.status(400).json({ error: 'password wrong' })
                            }

                        })

                } else {
                    res.status(400).json({ error: 'email wrong' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

}
module.exports = userController