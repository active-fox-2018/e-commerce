var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')
var isLogin = require('../middlewares/isLogin')
var isAdmin = require('../middlewares/isAdmin')
var images = require('../helpers/images')

router.get('/', productController.getAll)
router.post('/', isLogin, isAdmin, images.multer.single('image'), images.sendUploadToGCS, productController.create)
router.get('/search', isLogin, productController.getAll)
router.get('/:id', isLogin, productController.getOne)
router.put('/:id',isLogin, isAdmin, images.multer.single('image'), images.sendUploadToGCS, productController.update)
router.delete('/:id', isLogin, isAdmin, productController.delete)

module.exports = router