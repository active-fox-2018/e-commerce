const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const { authentication } = require('../middlewares/auth')
const { cartAuthorization, adminAuthorization, } = require('../middlewares/shopAuth')
const images = require('../helpers/images')

const multer = require('multer')
const upload = multer({ dest: '/tmp' })

router.use(authentication)
router.get('/', ProductController.find)
router.get('/:productId', ProductController.findOne)
router.post('/', adminAuthorization, ProductController.create)
router.put('/:productId', adminAuthorization, ProductController.update)
router.delete('/:productId', adminAuthorization, ProductController.delete)

router.post('/file/:productId',
    adminAuthorization,
    images.multer.single('productFile'),
    images.sendUploadToGCS,
    ProductController.fileUpload)

module.exports = router
