const express = require('express');
const router = express.Router();
const productRoute = require('./productRoute.js');
const userRoute = require('./userRoute.js');
const cartRoute = require('./cartRoute');
const transactionRoute = require('./transactionRoute');

router.use('/transactions', transactionRoute);
router.use('/products', productRoute);
router.use('/carts', cartRoute);
router.use('/', userRoute);

module.exports = router