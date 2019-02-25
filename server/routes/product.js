const ProductController = require('../controllers/product')
const router = require('express').Router()
const authentication = require('../middlewares/verify-admin')
const uploadImage = require('../helpers/uploadImage')

router.get('/', ProductController.allProduct)

router.get('/search/:productId', ProductController.findProduct)

router.use(authentication)

router.post('/',  uploadImage.multer.single('image'), uploadImage.sendUploadToGCS, ProductController.addProduct)

router.patch('/:productId', ProductController.editProduct)

router.delete('/:productId', ProductController.deleteProduct)

module.exports = router