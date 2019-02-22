const express = require('express')
const router = express.Router()
const GoogleController = require('../controllers/google')
const userRoutes = require('./user')
const cartRoutes = require('./cart')
const productRoutes = require('./product')
const transactionRoutes = require('./transaction')

router.use('/api/products', productRoutes)
router.use('/api/transactions', transactionRoutes)
router.use('/api/carts', cartRoutes)
router.use('/api/users', userRoutes)
router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/*', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
