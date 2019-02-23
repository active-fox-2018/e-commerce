var express = require('express');
var router = express.Router();

const { getProvince, getCity, getCost } = require('../controllers/shippingController')

router.get('/province', getProvince)
router.get('/city/:provinceId', getCity)
router.post('/cost', getCost)

module.exports = router;
