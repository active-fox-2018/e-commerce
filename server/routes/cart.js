const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cart')
const { authentication } = require('../middlewares/auth')
const { cartAuthorization, adminAuthorization, } = require('../middlewares/shopAuth')

router.use(authentication)
router.get('/', CartController.find)
router.post('/', CartController.create)
router.get('/:cartId', cartAuthorization, CartController.findOne)
router.put('/:cartId', cartAuthorization, CartController.update)
router.delete('/:cartId', cartAuthorization, CartController.delete)

module.exports = router
