const router = require('express').Router()
const controller = require('../controllers/productController')
const isLogin = require('../middlewares/isLogin')
const image = require('../middlewares/image')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', controller.getAllProducts)
router.post('/', isLogin, isAdmin, image.multer.single('imageUrl'), image.sendUploadToGCS, controller.addProduct)
router.get('/:id', controller.getProduct)
router.put('/:id', isLogin, isAdmin, controller.editProduct)
router.delete('/:id', isLogin, isAdmin, controller.removeProduct)

module.exports = router