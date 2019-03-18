const router = require('express').Router()
const controller = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.post('/register', controller.signUp)
router.post('/login', controller.login)
router.post('/', controller.addUser)
router.get('/', controller.getUsers)
router.get('/:id', controller.getUser)
router.put('/:id', isLogin, controller.editUser)

module.exports = router