const router = require('express').Router()
const product = require('./products')
const user = require('./users')
const admin = require('./admin')
const cart = require('./cart.js')

router.use('/users', user)
router.use('/products', product)
router.use('/admin', admin)
router.use('/cart', cart)

module.exports = router
