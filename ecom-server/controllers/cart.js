const Cart = require('../models/cart')

module.exports = {
    addProductToCart: function (req, res) {
        Cart
            .findOne({
                userId: req.user.id
            }).populate('userId')
            .then(findResult => {
                findResult.productId.push(req.body.productId)
                return findResult.save()
            })
            .then((data) => {
                res.status(200).json({ data, msg: `success add product` })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    removeProductFromCart: function (req, res) {
        Cart
            .findOne({
                userId: req.user.id
            }).populate('userId')
            .then(findResult => {
                let productIndex = findResult.productId.indexOf(req.body.productId)
                if (productIndex !== -1) {
                    findResult.productId.splice(productIndex, 1)
                    return findResult.save()
                }
                else {
                    res.status(404).json({ msg: 'product not found' })
                }

            })
            .then((data) => {
                res.status(200).json({ data: data, msg: `success remove product` })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    getAllCart: function (req, res) {
        Cart
            .find({
                userId: req.user.id
            }).populate('productId').populate('userId')
            .then(findResult => {
                res.status(200).json(findResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    createCart: function (req, res) {
        Cart
            .create({
                userId: req.body.userId
            })
            .then(createResult => {
                res.status(201).json(createResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    updateCart: function (req, res) {
        Cart
            .findByIdAndUpdate(req.params.cartId, { $set: req.body }, { new: true })
            .then(findResult => {
                if (!findResult) res.status(404).json({ msg: `cart not found` })
                else res.status(200).json(findResult)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}