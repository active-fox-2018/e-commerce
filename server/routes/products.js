const express = require('express')
const route = express.Router()
const ProductController = require('../controllers/ProductController')
const { verifyProduct, verifyUser, authAdmin } = require('../middlewares')
const images = require('../helpers/image')

route.get('/', ProductController.findAll)
route.get('/:id',verifyProduct, ProductController.findOne)

route.use(verifyUser)
route.use(authAdmin)
route.post('/', images.multer.single('image'),  images.sendUploadToGCS, ProductController.create)
route.put('/:id', verifyProduct, images.multer.single('image'),  images.sendUploadToGCS, ProductController.update)
route.delete('/:id', verifyProduct, ProductController.delete)

module.exports = route