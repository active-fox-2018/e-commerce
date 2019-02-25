const Cart = require('../models/cart')
const Product = require('../models/product')
const Transaction = require('../models/transaction')

module.exports = {
  findCart: function(req, res) {
    Cart.findOne({ userId: req.headers.id }).populate({ path: 'products.productId'})
      .then(function(cart) {
        res
          .status(200)
          .json({ data: cart, message: 'cart found'})
      })
      .catch(function(err) {
        res
          .status(500)
          .json({ message: 'internal server error', err: err})
      })
  },

  addToCart: function(req, res) {
    
    let price = 0
    Product.findOne({ _id: req.params.id })
      .then(function(product) {
        if(product.stock < 1) {
          return null
        } else {
          price = product.price
          return Cart.findOne({ userId: req.headers.id })
        }
      })
      .then(function(cart) {
        if(!cart) return null
        let indexProduct = cart.products.findIndex(el => el.productId == req.params.id)
        if(indexProduct === -1) {
          cart.products.push({ productId: req.params.id, quantity: 1})
        } else {
          cart.products[indexProduct].quantity += 1
        }
        cart.totalPrice += price
        return cart.save()
      })
      .then(function(updated) {
        if(!updated) {
          res
            .status(400)
            .json({ message: 'out of stock'})
        } else {
          res
            .status(200)
            .json({ message: 'added to cart successfully', data: updated })
        }
      })
      .catch(function(err) {
        res
          .status(500)
          .json({ message: 'internal server error', err: err})
      })
  },
  deleteFromCart: function(req, res) {

    let price = 0
    Product.findOne({ _id: req.params.id })
      .then(function(product) {
        price = product.price
        return Cart.findOne({ userId: req.headers.id })
      })
      .then(function(cart) {
        let indexProduct = cart.products.findIndex(el => el.productId == req.params.id)
        if(indexProduct === -1) {
          return null
        } else {
          if(cart.products[indexProduct].quantity === 1) {
            cart.products.splice(indexProduct, 1)
          } else {
            cart.products[indexProduct].quantity -= 1
          }
          cart.totalPrice -= price
          return cart.save()
        }
      })
      .then(function(updated) {
        if(!updated) {
          res
            .status(400)
            .json({ message: 'product is not on your cart'})
        } else {
          res
            .status(200)
            .json({ message: 'removed product cart successfully', data: updated })
        }
      })
      .catch(function(err) {
        res
          .status(500)
          .json({ message: 'internal server error', err: err})
      })
  },
  clearCart: function(req, res) {
    let input = {
      products: [],
      totalPrice: 0,
    }
    Cart.findOneAndUpdate({ userId: req.headers.id }, { $set: input }, { new: true })
      .then(function(cart) {
        res
          .status(200)
          .json({ message: 'your cart is empty now', data: cart })
      })
      .catch(function(err) {
        res
          .status(500)
          .json({ message: 'internal server error', err: err})
      })
  },

  checkout: function(req, res) {
    // bikin transaksi, clearcart, status: pengiriman
    // console.log(req.body)
      let newTransaction = {}
      let cart = req.body.cart
      if (!cart.products.length) {
          res
            .status(400)
            .json({ message: 'Products Not Found' })
      } else {
        Transaction.create({
          userId: cart.userId,
          products: cart.products,
          totalPrice: cart.totalPrice,
          status:'ready',
        })
          .then(transaction => {
            newTransaction = transaction
            return Cart.findByIdAndUpdate(cart._id, {
              products: [],
              totalPrice: 0,
            })
          })
          .then(data => {
            res
              .status(201)
              .json(newTransaction)
          })
          .catch(error => {
            console.log(error)
            res
              .status(500)
              .json({ message: 'internal server error' })
          })
      }
  }
}