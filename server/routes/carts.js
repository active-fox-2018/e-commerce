const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const isLogin = require('../middlewares/isLogin')

router.get('/mycart', isLogin, cartController.findMyCart)
router.put('/addToCart', isLogin, cartController.addToCart)
router.put('/emptyCart', isLogin, cartController.emptyCard)
router.put('/reduceItem', isLogin, cartController.reduceItem)

module.exports = router