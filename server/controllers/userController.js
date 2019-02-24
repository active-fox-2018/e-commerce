const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePw } = require('../helpers/hashPw')

require('dotenv').config()

module.exports = {
    registerUser: (req, res, next) => {
        let newUser = { name, email, password } = req.body
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                req.error = {register: err}
                next()
            })
    },
    loginUser: (req, res, next) => {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePw(req.body.password, user.password)) {
                        let token = jwt.sign({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        }, process.env.JWT_SECRET)
                        res.status(200).json({
                            token: token, 
                            id: user._id,
                            role: user.role
                        })
                    } else {
                        req.error = {
                            login: {
                                msg: 'Email/password is wrong!'
                            }
                        }
                        next()
                    }
                } else {
                    req.error = {
                        login: {
                            msg: 'Email/password is wrong!'
                        }
                    }
                    next()
                }
            })
            .catch(err => {
                req.error = err
                next()
            })
    },
    
}