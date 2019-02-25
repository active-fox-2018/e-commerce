const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

/* GET users listing. */
router.post('/',userController.create )

router.post('/login', userController.login)

module.exports = router
