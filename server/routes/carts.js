var express = require('express');
var router = express.Router();
const cart = require('../controllers/carts')
const { findCart  } = require('../middlewares')

router.use(findCart)
router
    .get('/', cart.getCart)
    .put('/addProducts', cart.updateQty)
    .put('/reduceProducts', cart.reduceQty)
    .put('/checkout', cart.clearCart)

module.exports = router;
