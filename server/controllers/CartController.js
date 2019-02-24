const Cart = require('../models/Cart')
const Product = require('../models/Product')

class CartController {
    static create (req, res) {

        if (req.body.qty < 1) {
            res.status(400).json({
                msg: `Quantity invalid`
            })
        } else {
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
            Cart.find({ user: req.currentUser._id, checkout: false, product: req.currentProduct._id }).populate('product').exec()
                .then( data => {
                    if (data.length == 0) {
                        if (req.currentProduct.qty < req.body.qty) {
                            res.status(400).json({
                                msg: `Product amount exceeded`
                            })
                        } else {
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
                    } else {
                        let qty = Number(req.body.qty) + Number(data[0].qty)
                        if (data[0].product.qty < qty) {
                            res.status(400).json({
                                msg: `Product amount exceeded`
                            })
                        } else {
                            data[0].set({ qty })
                            data[0].save()
                                .then(updateQty => {
                                    return updateQty.populate('product').populate('user').execPopulate()
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
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })

        }
            
       
    }

    static findMyCart (req, res) {
        Cart.find({ user: req.currentUser._id, checkout: false }).populate('product').populate('user').exec()
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
                qty
                // ,
                // checkout: req.body.checkout,
                // checkoutDate: req.body.checkoutDate,
                // recieved: req.body.recieved
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
        Cart.deleteMany({ user: req.currentUser._id, checkout: false})
            .then(success => {
                res.status(200).json(success)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static getHistory (req, res) {
        Cart.find({ checkout: true }).populate('product').populate('user').exec()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static checkoutOne (req, res) {
        let checkoutCart = {
            checkout: true,
            checkoutDate: new Date()
        }
        Product.findById(req.currentCart.product._id) 
            .then(product => {
                if (product.qty < req.currentCart.qty) {
                    res.status(400).json({
                        msg: `Too late.. only ${product.qty} left`
                    })
                } else {
                    req.currentCart.set(checkoutCart)
                    req.currentCart.save()
                        .then(data => {
                            return Product.findById(req.currentCart.product._id)
                            // return data.populate('product').populate('user').execPopulate()
                        })
                        .then(product => {
                            let qtyNow = product.qty - req.currentCart.qty
                            product.set({ qty: qtyNow})
                            return product.save()
                        })
                        .then(upProduct => {
                            res.status(200).json(req.currentCart)
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: err.message
                            })
                        })
                }
            })
    }

    static checkout (req, res) {

        let ids = req.body.carts
        let allCart = []
        let i = 0
        let status = false

        while (i !== ids.length && !status) {
            Cart.findByIdAndUpdate(ids[i]._id, { checkout: true, checkoutDate: new Date() }, { new: true })  
            .then(data => {
                console.log('masuk ', i, status)
                allCart.push(data)
                i++
                // if (i == ids.length-1) {
                //     status = true
                //     return
                // }
                // break;
            })  
            .catch(err => {
                status = true
                res.status(500).json({
                    msg: err.message
                })
                console.log(err, 'ini err')
                // break;
            })    
        }
        res.status(200).json({
            msg: 'checkout all success'
        })
    }

    static recievedOne (req, res) {
        req.currentCart.set({ recieved: new Date()})
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