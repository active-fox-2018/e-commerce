var express = require('express');
var router = express.Router();

const { 
    getAllCart, 
    createCart, 
    addQty, 
    reduceQty, 
    emptyCart, 
    checkOutCart,
    removeCart } = require('../controllers/cartController')

const userAuth = require('../middlewares/userAuth')
const { findOneProduct } = require('../middlewares/findProduct')

router.post('/', userAuth,  findOneProduct, createCart)
router.get('/', userAuth, getAllCart)
router.put('/add/:id', userAuth, addQty)
router.put('/remove/:id', userAuth,reduceQty)
router.put('/', userAuth,checkOutCart)
router.delete('/', userAuth, emptyCart)
router.delete('/:id', userAuth, removeCart)

module.exports = router;
