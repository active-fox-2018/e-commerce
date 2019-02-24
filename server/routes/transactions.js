const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', isLogin, isAdmin, TransactionController.findAll)
router.post('/', isLogin, TransactionController.create)
router.get('/status', isLogin, isAdmin, TransactionController.findByStatus )
router.put('/status', isLogin, TransactionController.updateStatus)
router.get('/user', isLogin, TransactionController.findByUserId)
router.post('/shippingCost', isLogin, TransactionController.addShippingCost)

module.exports = router