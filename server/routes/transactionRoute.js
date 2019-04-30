const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { isLogin, isAdmin } = require('../middlewares/middleware');

router.get('/', isLogin, isAdmin, transactionController.getAll);
router.get('/user', isLogin, transactionController.getTransaction);
router.put('/:id', isLogin, transactionController.update);

module.exports = router