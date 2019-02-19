const User = require('../models/user')

function authorizationAdminOnly(req, res, nex) {
  User.findOne({
      _id: req.userAuthentic._id
    })
    .then(user => {
      if (user.type == 'admin') {
        next()
      } else {
        throw '400'
      }
    })
    .catch(err => {
      if (err == 400) {
        res.status(400).json({
          err: 'not authorized'
        })
      } else {
        res.status(500).json({
          err: err.message
        })
      }
    })
}

module.exports = authorizationAdminOnly