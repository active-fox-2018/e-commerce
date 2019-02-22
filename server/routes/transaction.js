const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transaction')
const { authentication } = require('../middlewares/auth')
const { cartAuthorization, transactionAuthorization, adminAuthorization, } = require('../middlewares/shopAuth')

router.use(authentication)
router.post('/checkout', TransactionController.checkout)
router.get('/', TransactionController.find)

router.post('/pay/:transactionId', transactionAuthorization, TransactionController.pay)
router.post('/send/:transactionId', adminAuthorization, TransactionController.send)
router.post('/finish/:transactionId', transactionAuthorization, TransactionController.finish)

router.get('/all', adminAuthorization, TransactionController.findAll)

module.exports = router
