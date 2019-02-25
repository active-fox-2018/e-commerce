const Cart = require('../models/cart')
const Product = require('../models/product')

class Controller {
    static getUserCart(req, res) {
        // console.log(req.decoded)
        Cart.findOne({
            userId: req.decoded.id
        }).populate('productId')  
        .then(cart => {
            console.log(cart)
            res
                .status(200)
                .json(cart.productId)
        })
        .catch(err => {
            // console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }
    static increaseCartQuantity(req, res) {
        // console.log(req.decoded)
        Cart.findOne({
            userId: req.decoded.id
        }) 
        .then(cart => {
            // console.log(cart)
            cart.productId.push(req.params.productId)
            cart.save()
            return Product.findById(req.params.productId)
        })
        .then(product => {
            let updatedStock = product.stock - 1
            return Product.updateOne({
                _id: req.params.productId
            }, {
                stock: updatedStock
            })
        })
        .then(updateProd => {
            console.log(updateProd)
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static reduceCartQuantity(req, res) {
        // console.log('siniiii')
        // console.log(req.decoded)
        Cart.findOne({
            userId: req.decoded.id
        }) 
        .then(cart => {
            // console.log(cart)
            let indexToDelete = cart.productId.indexOf(req.params.productId)
            // console.log(indexToDelete)
            cart.productId.splice(indexToDelete, 1)
            cart.save()
            return Product.findById(req.params.productId)
        })
        .then(product => {
            let updatedStock = product.stock + 1
            return Product.updateOne({
                _id: req.params.productId
            }, {
                stock: updatedStock
            })
        })
        .then(updateProd => {
            console.log(updateProd)
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static clearCart(req, res) {
        console.log(req.decoded)
        Cart.findOne({
            userId: req.decoded.id
        }) 
        .then(cart => {
            console.log(cart)
            cart.productId = []
            cart.save()
            res 
                .status(200)
                .json({
                    msg: 'Success clear cart'
                })
        }) 
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }
}

module.exports = Controller