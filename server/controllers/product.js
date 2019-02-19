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
      .catch(error => {
        res.status(500).json(error);
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
      .catch(error => {
        res.status(500).json(error);
      });
  },
  findOneProduct: function (req, res) {
    Product
      .findOneAndUpdate({ _id: req.params.id })
      .then(data => {
        res.status(200).json(
          { data }
        );
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
  updateProduct: function (req, res) {
    Product
      .findOneAndUpdate({ _id: req.params.id },
        {
          productName: req.body.productName,
          price: req.body.price,
          stock: req.body.stock
        }, { new: true })
      .then(data => {
        res.status(200).json({
          message: 'Product updated!',
          data
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
  deleteProduct: function (req, res) {
    Product
      .findOneAndDelete({ _id: req.params.id })
      .then(data => {
        res.status(200).json({
          message: 'Product deleted!',
          data
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};
