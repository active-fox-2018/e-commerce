const Transaction = require('../models/Transaction')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    getTransaction: (req, res) => {
        console.log(req.current_user._id)
        Transaction
            .find({userId: ObjectId(req.current_user._id)})
            .populate('productId')
            .then(transactions => {
                res.status(200).json(transactions)
            }).catch((err) => {
                res.status(500).json(err)
            })
    },
    getAdmnTransaction: (req, res) => {
        Transaction
            .find({
                // userId: ObjectId(req.current_user._id),
                status: 'paid',
                status: 'received'
            })
            .populate('productId')
            .then(transactions => {
                console.log(transactions)
                res.status(200).json(transactions)
            }).catch((err) => {
                res.status(500).json(err)
            })
    },
    updateStatus: (req, res) => {
        Transaction
            .findOneAndUpdate({_id: ObjectId(req.params.id)}, {$set: {status: req.body.status}}, {new: true})
            .then((result) => {
                return result.populate('productId').execPopulate()
                // console.log(result)
            })
            .then(updated => {
            
                res.status(200).json(updated)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    }
}