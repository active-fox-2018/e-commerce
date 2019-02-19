const express = require('express')
const route = express.Router()
const CartController = require('../controllers/CartController')
const { verifyProduct, verifyUser, authUser, verifyCart, authAdmin } = require('../middlewares')

route.use(verifyUser)
route.get('/', CartController.findMyCart)
route.post('/:id', verifyProduct, CartController.create)

route.delete('/', CartController.clearCart)
route.get('/:id', verifyCart, authUser, CartController.findOne)
route.put('/:id', verifyCart, authUser, CartController.update)
route.delete('/:id', verifyCart, authUser, CartController.deleteOne)


module.exports = route