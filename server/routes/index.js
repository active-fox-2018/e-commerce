const product = require('./product')
const cart = require('./cart')
const shipping = require('./shipping')
const transaction = require('./transaction')
const { registerUser, loginUser } = require('../controllers/userController')
const { errHandling } = require('../middlewares/error')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg: 'Connected . . .'});
});

router.use('/products', product)
router.use('/carts', cart)
router.use('/shippings', shipping)
router.use('/transactions', transaction)

router.post('/register', registerUser, errHandling)
router.post('/login', loginUser, errHandling)

module.exports = router;
