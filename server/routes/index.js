var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const productRouter = require('./products')
const cartRouter = require('./carts')
const transactionRouter = require('./transactions')
const { isLogin } = require('../middlewares')

router
  .use(userRouter)
  .use('/products', productRouter)
  .use('/carts', isLogin, cartRouter)
  .use('/transactions', isLogin, transactionRouter)

module.exports = router;
