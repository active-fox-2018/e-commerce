var express = require('express');
var router = express.Router();

const { 
    getTransaction, 
    updateStatus, 
    getAdmnTransaction } = require('../controllers/transactionController')

const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/adminAuth')

router.get('/', userAuth, getTransaction )
router.get('/admin', adminAuth, getAdmnTransaction )
router.patch('/:id', userAuth, updateStatus)

module.exports = router;
