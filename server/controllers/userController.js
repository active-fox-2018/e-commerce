const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePw } = require('../helpers/hashPw')

require('dotenv').config()

module.exports = {
    registerUser: (req, res) => {
        console.log(req.body)
        let newUser = { name, email, password } = req.body.data
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    loginUser: (req, res) => {
        // if(!req.body.data.email) {
        //     res.status(400).json({msg: 'Please fill in all the form'})
        // } else if (!req.body.data.password) {
        //     res.status(400).json({msg: 'Please fill in all the form'})
        // } else {
            console.log(req.body)
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
                            res.status(400).json({ msg: 'Email/password is wrong!' })
                        }
                    } else {
                        res.status(400).json({ msg : 'Email/password is wrong!' })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        // }
    },
    
}