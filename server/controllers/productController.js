const Product = require('../models/product')

module.exports = {
  create: function (req, res) {
    let image  = req.file ? req.file.cloudStoragePublicUrl : req.body.image || ''
    let input = {
      title : req.body.title,
      description : req.body.description,
      image : image,
      stock : req.body.stock,
      price: req.body.price,
      created_at: Date.now()
    }
  
    Product.create(input)
      .then( function(newProduct) {
        res
          .status(201)
          .json(newProduct)
      })
      .catch( function(err) {
        res
          .status(400)
          .json({ message : err.message })
      })
  },

  findAll: function (req, res) {

    Product.find({}).sort({ created_at: 'descending'}).limit(20)
      .then( function(products) {
        res
          .status(200)
          .json({ data : products })
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ message: 'interal server error', err: err})
      })
  },

  searchProduct: function(req, res) {
    let input = req.query.q
    Product.find({ 'title' : { '$regex' : input, '$options' : 'i' }})
      .then( function(products) {
        let message = `${products.length} products has been found`
        res
          .status(200)
          .json({ data : products, message: message })
      })
      .catch( function(err) {
        res
          .status(500)
          .json({ message : `internal server error` })
      })
  },

  findOne: function(req, res) {
    Product.findOne({ _id: req.params.id })
      .then(function(product) {
        if(!product) {
          res
            .status(400)
            .json({ message : 'product not found', data : null })
        } else {
          res
            .status(200)
            .json({ data: product, message: 'product found!' })
        }
      })
      .catch(function(err) {
        res
          .status(500)
          .json({ message: 'internal server error', err: err})
      })
  },

  delete: function(req, res) {

    // console.log(req.params.id, `INI PARAM ID DELETE`)
    Product.findOneAndDelete( { _id : req.params.id })
      .then( function(result) {
        // console.log('masuk sini')
        res
          .status(200)
          .json(result)
      })
      .catch( function(err) {
        res
          .status(500)
          .json(err)
      });
  },

  update: function(req, res) {

    let image = req.file ? req.file.cloudStoragePublicUrl : '';
    let input = {};
    for(let key in req.body) {
      if (key === 'title' || 
          key === 'description' || 
          key === 'stock' ||
          key === 'price') {
            input[key] = req.body[key]
          }
    }

    if(image.length) {
      input.image = image
    }
    
    Product.findOneAndUpdate({ _id : req.params.id }, { $set : input }, { new : true, runValidators : true } )
      .then(function(updated) {
        res
          .status(200)
          .json(updated)
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(400)
          .json({ err: err.message })
      });
  },
}