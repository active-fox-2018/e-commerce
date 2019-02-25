var express = require('express');
var router = express.Router();
const productController = require('../controller/product')
const access = require('../middlewares/access')
const isAdmin = require('../middlewares/isAdmin')
const images = require('../helpers/images')

/* GET home page. */
router.get('/products', productController.findAll)

router.post('/products',access, isAdmin,images.multer.single('image'), 
images.sendUploadToGCS, productController.create)

router.patch('/product/:id',access, isAdmin,images.multer.single('image'), 
images.sendUploadToGCS, productController.update)

router.delete('/product/:id', access, isAdmin, productController.delete )
module.exports = router;
