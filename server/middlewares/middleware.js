const User = require('../models/user')
const { tokenDecoder } = require('../helpers/jwt')

module.exports = {
  isLogin: function(req, res, next) {
      
    try {
      let token = req.headers.token
      
      if(!token) {
        res
          .status(400)
          .json({ message : `you have to be login first`})
      } else {
        let tokenDecoded = tokenDecoder(token)
        User.findOne({ email : tokenDecoded.email })
          .then( function(user) {
            // console.log('here')
            if(!user) {
              res
                .status(400)
                .json({ message : `error with user login`})
            } else {
              req.headers.id = user.id
              next()
            }
          })
          .catch( function(err) {
            throw err
          })
      }
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ message :`internal server error` })
    }
  },

  isAdmin: function(req, res, next) {
    
    User.findById(req.headers.id)
      .then( function(user) {
        if(user.role != 'admin') {
          res
            .status(400)
            .json({ message : `authorized access only`})
        } else {
          next()
        }
      })
  }
}