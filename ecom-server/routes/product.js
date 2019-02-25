const router = require('express').Router()
const { createProduct, getAllProduct, deleteProduct, editProduct } = require('../controllers/product')
const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')
const images = require('../middlewares/images')

router.post('/', images.multer.single('image'), images.sendUploadToGCS, createProduct)
router.get('/', getAllProduct)
router.delete('/:id' , deleteProduct)
router.put('/:id', auth, adminAuth, editProduct)
router.patch('/:id', auth, adminAuth, editProduct)

module.exports = router