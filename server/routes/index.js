const product = require('./product')
const cart = require('./cart')
const shipping = require('./shipping')
const transaction = require('./transaction')
const userAuth = require('../middlewares/userAuth')
const { registerUser, loginUser } = require('../controllers/userController')
const { errHandling } = require('../middlewares/error')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/products', product)
router.use('/carts', userAuth, cart)
router.use('/shippings', shipping)
router.use('/transactions', transaction)

router.post('/register', registerUser, errHandling)
router.post('/login', loginUser, errHandling)

module.exports = router;
