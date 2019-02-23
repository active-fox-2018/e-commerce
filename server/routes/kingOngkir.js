const express = require('express')
const route = express.Router()
const KingController = require('../controllers/KingOngkir')

route.post('/', KingController.getCost)
route.get('/province', KingController.getProvince)
route.get('/city', KingController.getCity)
module.exports = route