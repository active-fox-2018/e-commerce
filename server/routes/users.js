const express = require('express')
const route = express.Router()
const UserController = require('../controllers/UserController')
const { verifyUser } = require('../middlewares')
const images = require('../helpers/image')

route.post('/', images.multer.single('image'),  images.sendUploadToGCS, UserController.create)
route.post('/gooSign', UserController.gooSign)
route.post('/login', UserController.login)
route.get('/', UserController.findAll)

route.use(verifyUser)
route.get('/me', UserController.getProfile)
route.put('/', images.multer.single('image'),  images.sendUploadToGCS, UserController.update)
route.delete('/', UserController.delete)

module.exports = route