const User = require('../models/user')
const Password = require('../helpers/password-encrypt-decrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static login(req, res) {
        User
            .findOne({email: req.body.email})
            .then((user) => {
                if (user) {
                    let isMatch = Password.decodePassword(req.body.password, user.password)
                    if (isMatch) {
                        let token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET);
                        res.status(200).json({status: "You are successfully logged in to your account", token})
                    } else {
                        res.status(400).json({status: "Sorry, wrong password"})
                    }
                } else {
                    res.status(400).json({status: "Sorry, your email is not registered"})
                }
            })
            .catch((err) => {
                res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
            })
    }

    static register(req, res) {
        User
            .create(req.body)
            .then((user) => {
                res.status(201).json({status: "You have successfully registered a new account", user})
            })
            .catch((err) => {
                if (err.name === "MongoError") {
                    res.status(400).json({status: "Sorry, Email has been used"})
                } else {
                    res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
                }
            })
    }

    static addCart(req, res) {
        User
            .findOneAndUpdate({_id: req.userStorage.id}, {$push: {cart: req.body.productId}}, {new: true})
            .then((updated) => {
                res.status(200).json({status: "You have successfully added a product to your cart", updated})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static getCart(req, res) {
        User
            .findOne({_id: req.userStorage.id})
            .populate('cart')
            .then((user) => {
                res.status(200).json({cart: user.cart})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static deleteCart(req, res) {
        User
            .findOneAndUpdate({_id: req.userStorage.id}, {cart: []}, {new: true})
            .then((user) => {
                res.status(200).json({cart: user.cart})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }
}

module.exports = UserController