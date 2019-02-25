const User = require('../models/user')
const Cart = require('../models/cart')
const { compareHash } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')


module.exports = {
  register: function(req, res) {
    let token = null  
    let newUser = null
    let input = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      role : req.body.role || 'user'
    }
    
    User.create(input)
      .then( function(user) {
        token = tokenGenerator(user._id, user.name, user.email)
        newUser = user
        return Cart.create({
          userId : user._id
        })
      })
      .then( function() {
        res
          .status(201)
          .json({ message : `registered successfully`, data: newUser, token : token})
      })
      .catch( function(err) {
        res
          .status(400)
          .json({ message : `failed register` , err : err.message })
      })
  }, 

  login: function(req, res) {

    User.findOne({ email : req.body.email })
      .then( function(user) {
        if(!user) {
          res
            .status(400)
            .json({ message : `invalid email or password`})
        } else if(!compareHash(req.body.password, user.password)) {
          res
            .status(400)
            .json({ message : `invalid email or password`})
        } else {
          let token = tokenGenerator(user._id, user.name, user.email)
          res
            .status(200)
            .json({ message : `login successful`,token : token, role : user.role })
        }
      })
      .catch(function(err) {
        res
          .status(500)
          .json({ message: 'internal server error', err: err })
      })
  },

  checkUsers: function(req, res) {

    User.find({})
      .then( function(users) {
        res
          .status(200)
          .json(users)
      })
      .catch( function(err) {
        console.error(err)
        res
          .status(500)
          .json({ message : `internal server error`})
      })
  }
}