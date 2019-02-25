const router = require('express').Router()
const cartController = require('../controller/cart')
const access = require('../middlewares/access')
const isAdmin = require('../middlewares/isAdmin')


router.post('/', access, isAdmin, cartController.create)

router.patch('/:id', access, cartController.update)

router.delete('/:id',access, isAdmin, cartController.delete)

module.exports = router