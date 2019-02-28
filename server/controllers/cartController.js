const Cart = require('../models/Cart')

class CartController {

  static addToCart(req, res, next) {
    let productId = req.body.productId
    Cart
      .findOne({ userId: req.user._id })
      .then(cart => {
        if (!cart) {
          res
            .status(400)
            .json({
              msg: 'not found'
            })
        } else {
          var quantityIndex = 0
          var isExist = false
          cart.products.forEach((product, index) => {
            if (product.productId == productId) {
              isExist = true
              quantityIndex = index
            }
          })

          if (!isExist) {
            cart.products.push({
              productId: productId,
              quantity: 1
            })
          } else {
            cart.products[quantityIndex].quantity++
          }

          return cart
            .save()
            .then(savedCart => {
              res
                .status(201)
                .json({
                  msg: "add to cart success",
                  data: savedCart
                })
            })
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(404)
          .json({
            message: "not found",
            err
          })
      })
  }

  static findMyCart(req, res, next) {
    Cart
      .findOne({ userId: req.user._id })
      .populate('products.productId')
      .then(cart => {
        res
          .status(200)
          .json({
            message: "get data success",
            data: cart
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            message: "not found",
            err
          })
      })
  }

  static emptyCard(req, res, next) {
    Cart
      .findOne({ userId: req.user._id })
      .then(cart => {
        cart.products = []
        return cart.save()
      })
      .then(updatedCart => {
        res
          .status(200)
          .json({
            msg: 'empty cart success',
            data: updatedCart
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: 'not found',
            err
          })
      })
  }

  static reduceItem(req, res, next) {
    let productId = req.body.productId

    Cart
      .findOne({ userId: req.user._id })
      .then(cart => {
        if (!cart) {
          res
            .status(400)
            .json({
              msg: 'cart not found'
            })
        } else {
          var quantityIndex;
          var isExist = false
          cart.products.forEach((product, index) => {
            if (product.productId == productId) {
              isExist = true
              quantityIndex = index
            }
          })

          if (!isExist) {
            res
            .status(400)
            .json({
              msg: 'product not found'
            })
          } else if(cart.products[quantityIndex].quantity > 1) {
            cart.products[quantityIndex].quantity--
          } else {
            cart.products = cart.products.filter(product => product.productId != productId)
          }

          return cart
            .save()
            .then(savedCart => {
              res
                .status(200)
                .json({
                  msg: "add to cart success",
                  data: savedCart
                })
            })
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(404)
          .json({
            message: "not found",
            err
          })
      })
  }
}

module.exports = CartController