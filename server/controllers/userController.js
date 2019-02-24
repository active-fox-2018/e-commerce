require('dotenv').config()
const User = require('../models/User')
const Cart = require('../models/Cart')
const { comparePW } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    var payload 
    
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // role: 'admin',
        source: 'manual'
      })
      .then(user => {
        payload = {
          _id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
          source: user.source,
        }

        let emptycart = {
          userId: user._id
        }

        return Cart.create(emptycart)
      })
      .then(cart => {
        res
          .status(201)
          .json({
            msg: "registration success",
            data: payload,
            token: jwtSign(payload),
            cart: cart
          })

      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "Bad Request",
            err
          })
        console.log(err)
      })
  }

  static login(req, res) {

    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          if (comparePW(req.body.password, user.password)) {
            var userInfo = {
              username: user.username,
              _id: user._id,
              role: user.role,
              email: user.email
            }

            res
              .status(200)
              .json({
                message: "sign in success",
                data: userInfo,
                token: jwtSign(userInfo)
              })
          } else {
            res
              .status(404)
              .json({
                message: "email/password not found"
              })
          }
        } else {
          res
            .status(404)
            .json({
              message: "email not registered"
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "Bad Request",
            err
          })
      })
  }
}

module.exports = UserController