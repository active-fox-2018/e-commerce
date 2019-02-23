const user = require('./users')
const product = require('./product')
const cart = require('./cart')
const shipping = require('./shipping')
const transaction = require('./transaction')

const { loginUser } = require('../controllers/userController')
// const userAuth = require('../middlewares/userAuth')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', user)
router.use('/products', product)
router.use('/carts', cart)
router.use('/shippings', shipping)
router.use('/transactions', transaction)

router.post('/login', loginUser)

module.exports = router;
