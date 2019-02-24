const routes = require('express').Router()
const Transaction = require('../models/transaction')
const ControllerItem = require('../controllers/itemController')
const ControllerUser = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorizationUserForCart = require('../middlewares/authorizationUserCart')
const authorizationUserForTransaction = require('../middlewares/authorizationUserForTransaction')
const authorizationAdmin = require('../middlewares/authorization-admin')
const images = require('../helpers/images')

routes.post('/register', ControllerUser.register)
routes.post('/register/admin', ControllerUser.registerAdmin)
routes.post('/login', ControllerUser.login)
routes.get('/items', ControllerItem.findAll)

routes.use(authentication)
routes.get('/transactions/user', ControllerUser.findTransactionUser)
routes.get('/users', ControllerUser.findOne)
routes.put('/users', ControllerUser.update)
routes.post('/items', images.multer.single('image') , images.sendUploadToGCS ,authorizationAdmin ,ControllerItem.create)
routes.put('/items/:id', authorizationAdmin ,ControllerItem.update)
routes.delete('/items/:id', authorizationAdmin ,ControllerItem.delete)
routes.get('/transactions', authorizationAdmin, function(req, res) {
  Transaction.find({}).populate('CartId').populate('UserId')
  .then(transactions => {
    res.status(200).json({transactions})
  })
  .catch(err => {
    res.status(500).json({err : err.message})
  })
})

routes.get('/carts', ControllerUser.findCartByUser)
routes.post('/addToCart', authorizationUserForCart ,ControllerUser.addToCart)
routes.delete('/removeCart/:id', authorizationUserForCart ,ControllerUser.removeCart)
routes.post('/checkout', authorizationUserForCart ,ControllerUser.checkOut)
routes.patch('/transaction/:id/:status', authorizationUserForTransaction ,ControllerUser.updateStatusTransaction)

module.exports = routes