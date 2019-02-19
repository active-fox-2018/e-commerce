const User = require('../models/user')
const Cart = require('../models/cart')
const Item = require('../models/item')
const Transaction = require('../models/transaction')
const compareHash = require('../helpers/compareHash')
const getTotalPrice = require('../helpers/getTotalPrice')
const jwt = require('jsonwebtoken')


class ControllerUser {

  static register(req, res) {
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      type : 'customer',
    })
    .then(user => {
      console.log('dari controller', user)
      res.status(201).json({user})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static update(req, res) {
    
  }

  static login(req, res) {
    let userFound = null
    User.findOne({
      email : req.body.email
    })
    .then(data => {
      userFound = data
      if(data) {
        data = userFound
        return compareHash(req.body.password, userFound.password)
      } else {
        throw '404'
      }
    })
    .then(verified => {
      if(verified){
        const token = jwt.sign({
          _id : userFound._id
        }, process.env.SECRET_JWT, {expiresIn : '1h'})
        res.status(200).json({token})
      } else {
        throw '404'
      }
    })
    .catch(err => {
      if(err == '404') {
        res.status(404).json({err : 'Not Authorized'})
      } else {
        res.status(500).json({err : err.message})
      }
    })
  }


  static addToCart(req, res) {
    Cart.findOne({
      item : req.body.item
    })
    .then(cart => {
      if(cart) {
        return cart.update({
          item : req.body.item + cart.item
        }, {
          new : true
        })
      } else {
        return Cart.create({
          UserId : req.userAuthentic._id,
          item : req.body.item,
          quantity : req.body.quantity
        })
      }
    })
    .then(cart => {
      res.status(201).json({cart})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static removeCart(req, res) {
    Cart.findOneAndDelete({
      _id : req.params.id,
      UserId : req.userAuthentic._id,
    })
    .then(cart => {
      res.status(201).cart({cart})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static checkOut(req, res) {
    let total = 0
    let cartsId = []
    Cart.find({
      UserId : req.userAuthentic._id,
      CheckOut : false
    }).populate('item')
    .then(carts => {
      let updateStock = []
      carts.forEach(cart => {
        total += cart.item.price * cart.quantity
        cartsId.push(cart._id)
        updateStock.push(cart.item.update({
          stock : cart.item.stock - cart.quantity
        }))
      })
      return Promise.all(updateStock)
    })
    .then(data => {
      return Transaction.create({
        totalPrice : total,
        status : 'incomplete',
        CartId : cartsId,
        UserID : req.userAuthentic.id,
        created_at : new Date(),
        updated_at : new Date()
      })
    })
    .then(transaction => {
      res.status(201).json(transaction)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err : err.message})
    })
  }

  static paidTransaction(req, res) {
    // Transaction.find
  }

  static confirmedTransaction(req, res) {

  }
}

module.exports = ControllerUser