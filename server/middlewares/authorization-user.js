const Cart = require('../models/cart')

function authorizationForUserCart(req, res, nex) {
  Cart.findOne({
    _id :  req.params.id
  })
  .then(data => {
    if(data && data.userId == req.userAuthentic._id) {
      next()
    } else {
      throw '400'
    }
  })
  .catch(err => {
    if(err == 400) {
      res.status(400).json({err : 'not authorized'})
    } else {
      res.status(500).json({err : err.message})
    }
  })
}

module.exports = authorizationForUserCart