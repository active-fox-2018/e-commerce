var express = require('express');
var router = express.Router();
const product = require('../controllers/products')
const { multer, sendUploadToGCS } = require('../middlewares/image')
const { isLogin, isAdmin } = require('../middlewares')

router
  .get('/', product.getAll)
  .get('/:productId', product.getOne)
  .post('/', isLogin, isAdmin, multer.single('file'), sendUploadToGCS, product.create)
  .put('/:productId', isLogin, isAdmin, multer.single('file'), sendUploadToGCS, product.update)
  .delete('/:productId', isLogin, isAdmin, product.delete)

module.exports = router;
