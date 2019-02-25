const User = require('../models/user')
const Cart = require('../models/cart')
const Item = require('../models/item')
const Transaction = require('../models/transaction')
const compareHash = require('../helpers/compareHash')
const jwt = require('jsonwebtoken')


class ControllerUser {

  static findOne(req, res) {
    User.findOne({
      _id: req.userAuthentic._id
    })
    .then(user => {
      res.status(200).json({user})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }


  static register(req, res) {
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      type : 'customer',
    })
    .then(user => {
      res.status(201).json({user})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static registerAdmin(req, res) {
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      type : 'admin',
    })
    .then(user => {
      res.status(201).json({user})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static update(req, res) {
    User.findOne({
      _id: req.userAuthentic._id,
    })
    .then(user => {
      for(let key in req.body) {
        user.set(key, req.body[key])
      }
      return user.save()
    })
    .then(user => {
      res.status(200).json({user})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
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
        res.status(200).json({token, email: userFound.email, name: userFound.name, type: userFound.type})
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

  static findCartByUser(req, res) {
    Cart.find({
      UserId: req.userAuthentic._id,
      CheckOut : false
    }).populate('item')
    .then(carts => {
      console.log(carts)
      res.status(200).json({carts})
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }


  static addToCart(req, res) {
    Cart.findOne({
      item : req.body.item,
      CheckOut: false
    }).populate('item')
    .then(cart => {
      if(cart) {
        if(cart.item.stock >= req.body.quantity){
            return cart.update({
              quantity : req.body.quantity
            })
          } else {
            throw '400'
          }
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
      if(err == '400') {
        res.status(400).json({err : 'out of stock'})
      } else {
        res.status(500).json({err : err.message})
      }
    })
  }

  static removeCart(req, res) {
    Cart.findOneAndDelete({
      _id : req.params.id,
      UserId : req.userAuthentic._id,
    })
    .then(cart => {
      res.status(201).json({cart})
    })
    .catch(err => {
      console.log(err)
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
      let updateAll = []
      carts.forEach(cart => {
        total += cart.item.price * cart.quantity
        cartsId.push(cart._id)
        updateAll.push(cart.item.update({
          stock : cart.item.stock - cart.quantity
        }))
        updateAll.push(cart.update({
          CheckOut : true
        }))
      })
      return Promise.all(updateAll)
    })
    .then(data => {
      return Transaction.create({
        totalPrice : total,
        status : 'incomplete',
        CartId : cartsId,
        UserId : req.userAuthentic._id,
        created_at : new Date(),
        updated_at : new Date()
      })
    })
    .then(transaction => {
      res.status(201).json(transaction)
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static findTransactionUser(req, res) {
    Transaction.find({
      UserId : req.userAuthentic._id
    })
    .populate({
      path: 'CartId',
      populate: {
        path: 'item'
      }
    })
    .then(transaction => {
      res.status(200).json(transaction)
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static updateStatusTransaction(req, res) {
    Transaction.findOneAndUpdate( {
      _id : req.params.id
    }, {
      $set : {
        status : req.params.status
      }
    }, {
      new : true
    })
    .then(transaction => {
      res.status(200).json(transaction)
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }
}

module.exports = ControllerUser