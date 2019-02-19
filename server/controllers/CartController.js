const Cart = require('../models/Cart')

class CartController {
    static create (req, res) {
        let cart = {
            product: req.currentProduct._id,
            user: req.currentUser._id,
            qty: req.body.qty
        }
        
        for (let i in cart) {
            if (!cart[i]) {
                delete cart[i]
            }
        }

        Cart.create(cart)
            .then(data => {
                return data.populate('product').populate('user').execPopulate()
            })
            .then(populated => {
                res.status(201).json(populated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findMyCart (req, res) {
        Cart.find({ user: req.currentUser._id}).populate('product').populate('user').exec()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findOne (req, res) {
        res.status(200).json(req.currentCart)
    }

    static update (req, res) {
        let qty = req.body.qty
        
        if (qty > req.currentCart.product.qty ) {
            res.status(400).json({
                msg: `Quantity exceeded!`
            })
        } else if (isNaN(qty) || qty <= 0) {
            res.status(400).json({
                msg: `Quantity is not valid`
            })
        } else {
            let upCart = {
                qty,
                checkout: req.body.checkout,
                checkoutDate: req.body.checkoutDate,
                recieved: req.body.recieved
            }
            req.currentCart.set(upCart)
            req.currentCart.save()
                .then(data => {
                    return data.populate('product').populate('user').execPopulate()
                })
                .then(populated => {
                    res.status(200).json(populated)
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }

    static clearCart (req, res) {
        Cart.deleteMany({ user: req.currentUser._id})
            .then(success => {
                res.status(200).json(success)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static deleteOne (req, res) {
        req.currentCart.remove()
            .then(removed => {
                res.status(200).json({
                    id: req.params.id
                })
            })
            .catch(err => {
                res.status(200).json({
                    msg: err.message
                })
            })
    }
}

module.exports = CartController