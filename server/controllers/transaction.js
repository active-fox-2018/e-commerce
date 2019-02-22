const models = require('../models')

class TransactionController {
    static async checkout(req, res) {
        try {
            let cartData = await models.Cart.find({ user: req.auth._id })
                .populate('product').lean()
            let transactionData
            if (cartData) {
                transactionData = await models.Transaction.create({
                    user: req.auth._id,
                    items: cartData,
                    date: new Date(),
                    status: 'unpaid',
                })
            } else {
                throw { message: 'empty cart' }
            }
            cartData = await models.Cart.deleteMany({ user: req.auth._id })
            res.status(201).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findAll(req, res) {
        try {
            let transactionData = await models.Transaction.find({})
                .sort({ date: -1 }).limit(100).populate('user').lean()
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async find(req, res) {
        try {
            let transactionData = await models.Transaction.find({ user: req.auth._id })
                .sort({ date: -1 }).limit(100).lean()
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async pay(req, res) {
        try {
            let transactionData = await models.Transaction.findById(req.params.transactionId)
            if (transactionData) {
                if (transactionData.status == 'unpaid' || !transactionData.status) {
                    transactionData.status = 'paid'
                }
                transactionData.save()
            }
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async send(req, res) {
        try {
            let transactionData = await models.Transaction.findById(req.params.transactionId)
            if (transactionData) {
                if (transactionData.status == 'paid') {
                    transactionData.status = 'sent'
                }
                transactionData.save()
            }
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async finish(req, res) {
        try {
            let transactionData = await models.Transaction.findById(req.params.transactionId)
            if (transactionData) {
                if (transactionData.status == 'sent') {
                    transactionData.status = 'finished'
                }
                transactionData.save()
            }
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = TransactionController
