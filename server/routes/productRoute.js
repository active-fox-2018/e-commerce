const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { isLogin, isAdmin } = require('../middlewares/middleware')
var images = require('../helpers/images')

router.post('/', isLogin, isAdmin, images.multer.single('image'), images.sendUploadToGCS, productController.create)

router.get('/', productController.findAll)

router.get('/search', productController.searchProduct)

router.get('/:id', productController.findOne)

router.delete('/:id', isLogin, isAdmin, productController.delete)

router.put('/:id', isLogin, isAdmin, productController.update)




module.exports = router