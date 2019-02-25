const { Transaction } = require('../models')

module.exports = {
  create(req, res) {
    let newTransaction = {
      userId: req.user._id,
      products: req.body.products,
      total: req.body.total
    }
    Transaction
      .create(newTransaction)
      .then(transaction => {
        res.status(201).json(transaction)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: 'internal server err',
          err: err
        })
      })
  },
  getAll(req, res) {
    Transaction
      .find()
      .populate('userId')
      .populate('products.productId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: 'internal server err',
          err: err
        })
      })
  },
  getMine(req, res) {
    let userId = {userId: req.user._id}
    Transaction
      .find(userId)
      .populate('products.productId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: 'internal server err',
          err: err
        })
      })
  },
  update(req, res) {
    let newTransaction = {
      status: req.body.status,
      createdAt: req.body.createdAt
    }
    Transaction
      .findByIdAndUpdate(req.params.transactionId, newTransaction, { new: true })
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'internal server err',
          err: err
        })
      })
  }
}