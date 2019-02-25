const { Transaction } = require('../models')

module.exports = {
    getCart(req, res) {
        res.status(200).json(req.userCart)
    },
    updateQty(req, res) {
        let cart = req.userCart
        let index = cart.products.findIndex(function(e) {
            return e.productId._id.toString() === req.body.productId.toString()
        })
        if (index === -1) {
            let input = {
                productId: req.body.productId,
                qty: req.body.qty
            }
            cart.products.push(input)
            cart.save()
            res.status(200).json(input)
        } else {
            cart.products[index].qty += req.body.qty
            cart.save()
            res.status(200).json(cart.products[index])
        }
    },
    reduceQty(req, res) {
        let cart = req.userCart
        let index = cart.products.findIndex(function(e) {
            return e.productId._id.toString() === req.body.productId.toString()
        })
        if (index === -1) {
            res.status(400).json({
                msg: 'product not found'
            })
        } else {
            cart.products[index].qty -= 1
            cart.save()
            res.status(200).json(cart.products[index])
        }
    },
    clearCart(req, res) {
        let userId = req.user._id
        let cart = req.userCart.products
        let newTransaction = {
            userId: userId,
            products: cart,
            total: req.body.total
        }
        Transaction
            .create(newTransaction)
            .then(transaction => {
                req.userCart.products = []
                req.userCart.save()
                res.status(201).json(transaction)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server err',
                    err: err
                })
            })
    }
}