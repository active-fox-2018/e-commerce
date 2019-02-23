const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const { verifyJwt } = require('../helpers')
const mongoose = require('mongoose')

module.exports = {
    verifyUser (req, res, next) {
       if (!req.headers.token) {
            res.status(401).json({
                msg: `Please login first`
            })
       } else {
            try {
                var decoded = verifyJwt(req.headers.token)
                if (mongoose.Types.ObjectId.isValid(decoded.id)) {
                    User.findById(decoded.id)
                        .then(data => {
                            if (!data) {
                                res.status(404).json({
                                    msg: `User not found`
                                })
                            } else {
                            req.currentUser = data
                            next() 
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: 'Internal server error'
                            })
                        })

                } else {
                    res.status(400).json({
                        msg: `User id is not valid`
                    })
                }

            } catch (err) {
                res.status(400).json({
                    msg: `Token invalid!`
                })
            }
       }
    },
    authAdmin (req, res, next) {
        if (req.currentUser.role != 'admin') {
            res.status(401).json({
                msg: `You are not authorized`
            })
        } else {
            next()
        }
    },
    verifyProduct (req, res, next) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Product.findById(req.params.id)
                .then(data => {
                    if (!data) {
                        res.status(404).json({
                            msg: `Product not found`
                        })
                    } else {
                    req.currentProduct = data
                    next() 
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: 'Internal server error'
                    })
                })

        } else {
            res.status(400).json({
                msg: `Product id is not valid`
            })
        }
    },
    verifyCart (req, res, next) {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            Cart.findById(req.params.id).populate('product').populate('user').exec()
                .then(data => {
                    if (!data) {
                        res.status(404).json({
                            msg: `Cart not found`
                        })
                    } else {
                    req.currentCart = data
                    next() 
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: 'Internal server error'
                    })
                })

        } else {
            res.status(400).json({
                msg: `Cart id is not valid`
            })
        }
    },
    authUser (req, res, next) {
        if (String(req.currentCart.user._id) == String(req.currentUser._id)) {
            next()
        } else {
            res.status(401).json({
                msg: `You are not authorized`
            })
        }
    }
}