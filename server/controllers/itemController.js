const Item = require('../models/item')

class ControllerItem {
  
  static create(req, res) {
    let image = req.body.image
    if (req.file) {
      image = req.file.cloudStoragePublicUrl
    }

    Item.create({
      name : req.body.name,
      image : image,
      price : req.body.price,
      stock : req.body.stock
    })
    .then(item => {
      res.status(201).json({item})
    })
    .catch(err => {
      console.log(err)
      if(err.errors) {
        res.status(400).json({err : err.message})
      } else {
        res.status(500).json({err : err.message})

      }
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
      res.status(500).json({err : err.message})
    })
  }

  static patch(req, res) {
    Item.findOneAndUpdate({
      _id : req.params.id
    }, {
      $set : req.body
    }, {
      new : true
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }

  static delete(req, res) {
    Item.findOneAndDelete({
      _id : req.params.id
    })
    .then(data => {
      if(data) {
        res.status(200).json(data)
      } else {
        throw '400'
      }
    })
    .catch(err => {
      if(err == 400) {
        res.status(400).json({err : err.message})
      } else {
        res.status(500).json({err : err.message})
      }
    })
  }

  static findAll(req, res) {
    Item.find({})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({err : err.message})
    })
  }
}

module.exports = ControllerItem