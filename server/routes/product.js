var express = require('express');
var router = express.Router();
const images = require('../helpers/images')
const { findAllProduct, createProduct, findOneProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', findAllProduct)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, createProduct)
router.get('/:id', findOneProduct)
router.put('/:id', images.multer.single('image'), images.sendUploadToGCS, updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;
