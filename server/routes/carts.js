const express = require('express')
const route = express.Router()
const CartController = require('../controllers/CartController')
const { verifyProduct, verifyUser, authUser, verifyCart, authAdmin } = require('../middlewares')

route.use(verifyUser)
route.get('/', CartController.findMyCart)
route.get('/:id', verifyCart, authUser, CartController.findOne)
route.get('/history', CartController.getHistory)//dah

route.post('/:id', verifyProduct, CartController.create) // IDNYA ID PRODUCT
route.put('/:id/checkout', verifyCart, CartController.checkoutOne)
route.put('/', CartController.checkout) // => belom bisa :(
route.put('/:id/recieved', verifyCart, CartController.recievedOne)
route.put('/:id', verifyCart, authUser, CartController.update)

route.delete('/', CartController.clearCart)
route.delete('/:id', verifyCart, authUser, CartController.deleteOne)


module.exports = route