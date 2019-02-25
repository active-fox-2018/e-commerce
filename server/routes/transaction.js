const TransactionController = require('../controllers/transaction')
const router = require('express').Router()
const userAuth = require('../middlewares/verify-user')
const adminAuth = require('../middlewares/verify-admin')

router.get('/', adminAuth, TransactionController.transactionSeller)

router.post('/', userAuth, TransactionController.newTransaction)

router.get('/buyer', userAuth, TransactionController.transactionBuyer)

router.patch('/buyer/:transactionId', userAuth, TransactionController.updateTransactionStatus)

module.exports = router