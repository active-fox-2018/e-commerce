var express = require('express');
var router = express.Router();
const images = require('../helpers/images')
const { 
    findAllProduct, 
    createProduct, 
    findOneProduct, 
    updateProduct, 
    deleteProduct } = require('../controllers/productController')
const adminAuth = require('../middlewares/adminAuth')

router.get('/', findAllProduct)
router.post('/', adminAuth, images.multer.single('image'), images.sendUploadToGCS, createProduct)
router.get('/:id', findOneProduct)
router.put('/:id', adminAuth, images.multer.single('image'), images.sendUploadToGCS, updateProduct)
router.delete('/:id', adminAuth, deleteProduct)

module.exports = router;
