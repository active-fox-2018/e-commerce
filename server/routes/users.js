var express = require('express');
var router = express.Router();

const { registerUser } = require('../controllers/userController')

router.post('/', registerUser)

module.exports = router;
