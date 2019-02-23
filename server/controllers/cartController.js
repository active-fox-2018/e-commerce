 const Cart = require('../models/Cart')
 const Transaction = require('../models/Transaction')
 const ObjectId = require('mongoose').Types.ObjectId

 module.exports = {
    createCart : (req, res) => {
        Cart
            .findOne({productId: ObjectId(req.body.productId)})
            .then(cart => {
                if(cart) {
                    addQty = cart.qty + req.body.qty
                    if(addQty > req.productStock) {
                        res.status(400).json({msg: 'Not Enough Qty!'})
                    } else {                        
                        cart.set({qty: addQty})
                        return cart.save()
                        .then(cart => {
                            return cart.populate('productId').execPopulate()
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json(err.message)
                        })
                    }
                } else {
                    let newCart = { userId, productId, qty } = req.body
                    return Cart.create(newCart)
                }
            })
            .then(cart => {
                return cart.populate('productId').execPopulate()
            })
            .then(populated => {
                res.status(201).json(populated)

            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err.message)
            })
    },
    getAllCart: (req, res) => {
        Cart
            .find({userId: ObjectId(req.current_user._id) })
            .populate({
                path: 'userId',
                select: 'email address'
            })
            .populate('productId')
            .then(carts => {
                res.status(200).json(carts)
            }).catch(err => {
                res.status(500).json(err)
            });
    },
    addQty: (req, res) => {
        Cart
            .findOne({_id: ObjectId(req.params.id)})
            .then(cart => {
                addQty = cart.qty + 1
                cart.set({qty: addQty})
                return cart.save()
            })
            .then(updated => {
                res.status(200).json({
                    msg: 'Success add item',
                    data: updated
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    reduceQty: (req, res) => {
        Cart
            .findOne({_id: ObjectId(req.params.id)})
            .then(cart => {
                if(cart.qty > 1) {
                    let reduceQty = cart.qty - 1
                    cart.set({qty: reduceQty})
                    return cart.save()
                } else if (cart.qty == 1) {
                    return cart.remove({_id: ObjectId(req.params.id)})
                }
            })
            .then(updated => {
                res.status(200).json({
                    msg: 'Success remove item',
                    data: updated
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    removeCart: (req, res) => {
        Cart
            .findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    emptyCart: (req, res) => {
        Cart
            .find({userId: ObjectId(req.body.userId)})
            .then(products => {
                console.log(products)
                products.forEach(function(element) {
                    // query update
                })
            })
            .catch(err => {
                console.log(err)
            })
        // Cart
        //     .deleteMany({userId: ObjectId(req.body.userId)})
        //     .then(emptyCart => {
        //         console.log('SUKSES')

        //         res.status(200).json({ data: emptyCart})
        //         console.log(emptyCart, '=========')
        //     })
        //     .catch(err => {
        //         res.status(500).json(err.message)
        //     })
    },
    checkOutCart: (req, res) => {
        let data = req.body.items
        let dataToReturn = []
        data.forEach(el => {
            let dataTransaction = {
                userId: req.current_user._id,
                productId: el.productId._id,
                qty: el.qty,
                totalPrice: el.totalPrice,
                status: 'payment'
            }
            Transaction
                .create(dataTransaction)
                .then(transaction => {
                    dataToReturn.push(transaction)
                    return Cart
                            .findByIdAndDelete(el._id)
                })
                .then(() =>{
                    res.status(200).json(dataToReturn)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })
    },

 }