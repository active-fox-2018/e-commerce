const Transaction = require('../models/transactions')

class TransactionController {

    static newTransaction(req, res) {
        let transactionDetail = {
            buyer: req.userStorage.id,
            products: req.body.productId,
        }
        Transaction
            .create(transactionDetail)
            .then((newTransaction) => {
                res.status(201).json({status: "Thank You, your transaction is now being processed", transaction: newTransaction})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }
    
    static updateTransactionStatus(req, res) {
        Transaction
            .findOneAndUpdate({_id: req.params.transactionId}, {status: "Received"}, {new: true})
            .then((updated) => {
                res.status(200).json({status: "Your transaction status has been updated"})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static transactionBuyer(req, res) {
        Transaction
            .find({buyer: req.userStorage.id})
            .populate('products')
            .then((transactions) => {
                res.status(200).json({transactions: transactions})
            })
            .catch((err) => {
                res.sttaus(500).json({status: "Internal Server Error"})
            })
    }

    static transactionSeller(req, res) {
        Transaction
            .find({})
            .populate('buyer')
            .populate('products')
            .then((transactions) => {
                res.status(200).json({transactions: transactions})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

}

module.exports = TransactionController
