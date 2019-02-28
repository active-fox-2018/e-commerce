require('dotenv').config()

const Transaction = require('../models/Transaction')
const Location = require('../models/Location')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const RajaOngkirAPIKey = process.env.RAJA_ONGKIR_KEY
const axios = require('axios')

class TransactionController {
  static create(req, res) {
    var transaction
    var quantity = []

    Transaction
      .create({
        userId: req.user._id,
        cartId: req.body.cartId,
        totalPrice: req.body.totalPrice,
        status: req.body.status,
        shippingCost: req.body.shippingCost,
        finalPrice: req.body.finalPrice
      })
      .then(transaction => {
        transaction = transaction
        return Cart
        .findById(transaction.cartId)
      })
      .then(cart => {
        var cartPromises = []
        cart.products.forEach(product => {
          quantity.push(product.quantity)
          cartPromises.push(Product.findById(product.productId))
        })
        
        return Promise
        .all(cartPromises)
        
      })
      .then(products => {
        var productPromises = []
        products.forEach((product, index) => {
          product.stock -= quantity[index]
          product.stock = product.stock<0 ? 0 : product.stock
          product.bought += quantity[index]
          product.bought = product.bought<0 ? 0 : product.bought
          productPromises.push(product.save())
        })

        return Promise
          .all(productPromises)
      })
      .then(() => {
        res
          .status(201)
          .json({
            msg: "create success",
            data: transaction
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "create failed",
            err
          })
      })
  }

  static updateStatus(req, res) {
    Transaction
      .findOneAndUpdate({
        _id: req.params.id
      }, {
          status: req.body.status
        },
        {
          new: true
        })
      .then(transaction => {
        if (!transaction) {
          res
            .status(401)
            .json({
              msg: 'not found',
              err
            })
        } else {
          res
            .status(200)
            .json({
              msg: 'update success',
              data: transaction
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: 'update failed',
            err
          })
      })
  }

  static findByUserId(req, res) {
    Transaction
      .find({ userId: req.user._id })
      .then(transaction => {
        res
          .status(200)
          .json({
            msg: 'fetch success',
            data: transaction
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: 'Not Found',
            err
          })
      })
  }

  static findByStatus(req, res) {
    Transaction
      .findOne({ status: req.body.status })
      .then(transaction => {
        res
          .status(200)
          .json({
            msg: 'fetch success',
            data: transaction
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: 'Not Found',
            err
          })
      })
  }

  static findAll(req, res) {
    Transaction
      .find()
      .populate('userId')
      .then(transactions => {
        res
          .status(200)
          .json({
            msg: 'fetch success',
            data: transactions
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: 'Not Found',
            err
          })
      })
  }

  static addShippingCost(req, res) {
    var query = {
      city_name: {
        $regex: '.*' + req.body.city_name + '.*',
        $options: 'i'
      }
    }

    var destinationId
    console.log(RajaOngkirAPIKey)
    Location
      .find(query)
      .then(locations => {
        destinationId = locations[0].city_id
        return axios
          .post(
            `https://api.rajaongkir.com/starter/cost`,
            {
              "origin": '153',
              "destination": destinationId,
              "weight": 1700,
              "courier": req.body.courier
            },
            {
              headers:
                { key: RajaOngkirAPIKey }
            }
          )
      })
      .then(({ data }) => {
        res
          .json({
            msg: 'success fetch data',
            shippingCost: data.rajaongkir.results[0].costs[0].cost[0].value
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: 'city not found',
            err
          })

      })
  }
}

module.exports = TransactionController