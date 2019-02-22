const models = require('../models')

async function cartAuthorization(req, res, next) {
    try {
        let cartData = await models.Cart.findById(req.params.cartId)
        if (!cartData) {
            throw { message: 'cart is not found' }
        } else if (req.auth._id == cartData.user) {
            next()
        }
        else {
            throw { message: 'not your cart' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

async function transactionAuthorization(req, res, next) {
    try {
        let cartData = await models.Transaction.findById(req.params.transactionId)
        if (!cartData) {
            throw { message: 'transaction is not found' }
        } else if (req.auth._id == cartData.user) {
            next()
        }
        else {
            throw { message: 'not your transaction' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

async function adminAuthorization(req, res, next) {
    try {
        let userData = await models.User.findById(req.auth._id)
        if (!userData) {
            throw { message: 'user is not found' }
        } else if (userData.role == 'admin') {
            next()
        } else {
            throw { message: 'unauthorized user' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

module.exports = { cartAuthorization, transactionAuthorization, adminAuthorization }
