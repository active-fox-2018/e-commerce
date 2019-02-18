const Product = require('../models/productModel');

module.exports = {
  createProduct: function (req, res) {
    Product
      .create({
        productName: req.body.productName,
        price: req.body.price,
        stock: req.body.stock
      })
      .then(data => {
        res.status(201).json({
          message: 'Product created!',
          data
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findAllProduct: function (req, res) {
    Product
      .find({})
      .then(data => {
        res.status(200).json({
          data
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateProduct: function (req, res) {
    Product
      .findOneAndUpdate(req.params.id,
        {
          productName: req.body.productName,
          price: req.body.price,
          stock: req.body.stock
        })
      .then(data => {
        res.status(200).json({
          message: 'Product updated!',
          data
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  deleteProduct: function (req, res) {
    Product
      .findOneAndDelete(req.params.id)
      .then(data => {
        res.status(200).json({
          message: 'Product deleted!',
          data
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};
