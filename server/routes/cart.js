var express = require('express');
var router = express.Router();

const { 
    getAllCart, 
    createCart, 
    checkOutCart,
    removeCart,
    updateQty } = require('../controllers/cartController')

const userAuth = require('../middlewares/userAuth')
const { findOneProduct } = require('../middlewares/findProduct')

router.post('/', userAuth,  findOneProduct, createCart)
router.get('/', userAuth, getAllCart)
router.put('/', userAuth,checkOutCart)
router.patch('/:id', userAuth, findOneProduct, updateQty)
router.delete('/:id', userAuth, removeCart)

module.exports = router;
