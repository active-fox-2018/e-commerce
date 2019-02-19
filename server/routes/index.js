const routes = require('express').Router()
const ControllerItem = require('../controllers/itemController')
const ControllerUser = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorizationUser = require('../middlewares/authorization-user')
const authorizationAdmin = require('../middlewares/authorization-admin')


routes.post('/register', ControllerUser.register)
routes.post('/login', ControllerUser.login)
routes.get('/items', ControllerItem.findAll)

routes.use(authentication)

routes.post('/items', authorizationAdmin ,ControllerItem.create)
routes.put('/items/:id', authorizationAdmin ,ControllerItem.update)
routes.delete('/items/:id', authorizationAdmin ,ControllerItem.delete)

routes.use(authorizationUser)
routes.post('/addToCart', ControllerUser.addToCart)
routes.patch('/removeCart', ControllerUser.removeCart)
routes.post('/checkout', ControllerUser.checkOut)
routes.patch('/pay/:id', ControllerUser.paidTransaction)
routes.patch('/confirmed/:id', ControllerUser.confirmedTransaction)


module.exports = routes