const Product = require('../models/Product')

class ProductController {
  static create(req, res, next) {
    var body = {}

    if (req.file) {
      var data = JSON.parse(req.body.data)
      body = {
        name: data.name,
        price: data.price,
        stock: data.stock,
        imagePreviewURL: data.imagePreviewURL,
        image: req.file.cloudStoragePublicUrl
      }
    } else {
      body = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        imagePreviewURL: req.body.imagePreviewURL,
        image: req.body.image
      }
    }

    Product
      .create(body)
      .then(product => {
        res
          .status(201)
          .json({
            message: "product posted succesfully",
            data: product
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "bad request",
            err
          })
      })
  }

  static getAll(req, res, next) {
    let query = {}

    if (req.query.q) {
      query = {
        name: {
          $regex: '.*' + req.query.q + '.*',
          $options: "i"
        }
      }
    }

    Product
      .find(query)
      .then(products => {
        if (products.length) {
          res
            .status(200)
            .json({
              message: "get data success",
              data: products
            })
        } else {
          res
            .status(404)
            .json({
              message: "data not found"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error on get all",
            err
          })
      })
  }

  static getOne(req, res, next) {

    Product
      .findOne({ _id: req.params.id })
      .then(product => {
        res
          .status(200)
          .json({
            message: "get data success",
            data: product
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error on get One",
            err
          })
      })
  }

  static update(req, res, next) {
    var body = {}
    
    if (req.file) {
      var data = JSON.parse(req.body.data)
      body = {
        name: data.name,
        price: data.price,
        stock: data.stock,
        imagePreviewURL: data.imagePreviewURL,
        image: req.file.cloudStoragePublicUrl
      }
    } else {
      body = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        imagePreviewURL: req.body.imagePreviewURL,
        image: req.body.image
      }
    }

    Product
      .findOneAndUpdate({ _id: req.params.id }, body, { new: true })
      .then(updatedProduct => {
        res
          .status(200)
          .json({
            message: "udpate data success",
            data: updatedProduct
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error on Update",
            err
          })
      })
  }

  static delete(req, res, next) {
    Product
      .findOneAndDelete({ _id: req.params.id })
      .then(product => {
        res
          .status(200)
          .json({
            message: "delete success",
            data: product
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error on delete",
            err
          })
      })
  }

}

module.exports = ProductController