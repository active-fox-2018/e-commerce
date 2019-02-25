const AdminController = require('../controllers/admin')
const router = require('express').Router()

router.post('/register', AdminController.create)

router.post('/login', AdminController.login)

module.exports = router