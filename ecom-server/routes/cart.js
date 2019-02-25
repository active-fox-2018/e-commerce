const router = require('express').Router()
const { removeProductFromCart, updateCart,addProductToCart,getAllCart } = require('../controllers/cart')
const auth = require('../middlewares/auth')

// router.post('/', auth, createCart)
router.post('/', auth, addProductToCart )
router.patch('/',auth, removeProductFromCart)
// router.patch('/:cartId', updateCart)
router.get('/', auth, getAllCart)
// router.patch()

module.exports = router