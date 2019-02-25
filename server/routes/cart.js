const router = require('express').Router()
const controller = require('../controllers/cartController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, controller.getUserCart)
router.put('/add/:productId', isLogin, controller.increaseCartQuantity)
router.put('/min/:productId', isLogin, controller.reduceCartQuantity)
router.delete('/', isLogin, controller.clearCart)

module.exports = router