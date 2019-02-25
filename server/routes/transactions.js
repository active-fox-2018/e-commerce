var express = require('express');
var router = express.Router();
const transaction = require('../controllers/transactions')
const { isAdmin } = require('../middlewares')

router
  .get('/', isAdmin, transaction.getAll)
  .get('/myTransactions', transaction.getMine)
  .post('/', transaction.create)
  .put('/:transactionId', transaction.update)

module.exports = router;
