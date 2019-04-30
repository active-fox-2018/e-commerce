const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/middleware')
const cartController = require('../controllers/cartController')

router.get('/', isLogin, cartController.findCart)
router.put('/checkout', isLogin, cartController.checkout)
router.put('/products/:id', isLogin, cartController.addToCart)
router.delete('/products', isLogin, cartController.clearCart)
router.delete('/products/:id', isLogin, cartController.deleteFromCart)

module.exports = router