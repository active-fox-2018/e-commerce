const Item = require('../models/item')

class ControllerItem {
  static create(req, res) {
    Item.create({
      name : req.body.name,
      image : req.body.image,
      price : req.body.price,
      stock : req.body.stock
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).jsons({err : err.message})
    })
  }

  static update(req, res) {
    Item.findOneAndUpdate({
      _id : req.params.id
    }, {
      $set : {
        name : req.body.name,
        image : req.body.image,
        price : req.body.price,
        stock : req.body.stock
      }
    }, {
      new : true
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).jsons({err : err.message})
    })
  }

  static delete(req, res) {
    Item.findByIdAndDelete({
      _id : req.params.id
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).jsons({err : err.message})
    })
  }

  static findAll(req, res) {
    Item.find({})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).jsons({err : err.message})
    })
  }
}

module.exports = ControllerItem