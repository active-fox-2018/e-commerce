var express = require('express');
var router = express.Router();

const { 
    getAllCart, 
    createCart, 
    checkOutCart,
    removeCart,
    updateQty } = require('../controllers/cartController')

const { findOneProduct } = require('../middlewares/findProduct')

router.post('/',  findOneProduct, createCart)
router.get('/', getAllCart)
router.put('/',checkOutCart)
router.patch('/:id', findOneProduct, updateQty)
router.delete('/:id', removeCart)

module.exports = router;
