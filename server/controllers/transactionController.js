const Transaction = require('../models/transaction');

module.exports = {
  getAll: function(req, res) {
    Transaction.find({}).populate('userId')
      .then(transactions => {
        res
          .status(200)
          .json(transactions);
      })
      .catch(error => {
        res
          .status(500)
          .json({
          message: 'internal server error'
          });
      });
  },

  getTransaction: function(req, res) {
    Transaction.find({
      userId: req.headers.id
    })
      .populate('userId')
      .then(transactions => {
        res
          .status(200)
          .json(transactions);
      })
      .catch(error => {
        res.status(500).json({
          message: 'internal server error'
        });
      });
  },

  update: function(req, res) {
    console.log(req.body.status)
    Transaction.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, {
      new: true
    })
      .then(transaction => {
        res
          .status(200)
          .json(transaction);
      })
      .catch(error => {
        res
          .status(500)
          .json({
          message: 'internal server error'
          });
      });
  },
}
