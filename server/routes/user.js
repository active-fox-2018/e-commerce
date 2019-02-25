const UserController = require('../controllers/user')
const router = require('express').Router()
const authentication = require('../middlewares/verify-user')


router.patch('/', authentication, UserController.addCart)

router.get('/', authentication, UserController.getCart)

router.patch('/deleteCart', authentication, UserController.deleteCart)

router.post('/register', UserController.register)

router.post('/login', UserController.login)

module.exports = router