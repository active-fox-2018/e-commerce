const Product = require('../models/Product')
const Cart = require('../models/Cart')
const ObjId = require('mongoose').Types.ObjectId

class ProductController {

    static findAll(req, res) {
        Product.find({ qty: { $gt: 0 } })
            .then(list => {
                res.status(200).json(list)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static create (req, res) {
        if (!req.body.name || !req.body.price) {
            res.status(400).json({
                msg: `Name and price must be filled`
            })
        } else if (isNaN(req.body.price)) {
            res.status(400).json({
                msg: `Price must be number`
            })
        } else if (req.body.qty <= 0 ) {
            res.status(400).json({
                msg: `Minimal quantity is 1`
            })
        } else {
            let image = null 
            if (req.file) {
                image = req.file.cloudStoragePublicUrl
            }
            let product = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                qty: req.body.qty,
                image
            }

    
            Product.create(product)
                .then(data => {
                    res.status(201).json(data)
                    // req.io.emit('new-product', data)
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })

        }
    }

    static update (req, res) {
        if (isNaN(req.body.price) && req.body.price) {
            res.status(400).json({
                msg: `Price must be number`
            })
        } else {
            let image = undefined
            if (req.file) {
                image =req.file.cloudStoragePublicUrl
            }
            let product = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image,
                qty: req.body.qty
            }
    
            for (let i in product) {
                if (!product[i]) {
                    delete product[i]
                }
            }
         
    
            Product.findByIdAndUpdate(req.params.id, {$set: product}, {new: true})
                .then(data => {
                    res.status(200).json(data)
                    // req.io.emit('edit-product', data)
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })

        }
        
    }

    static delete (req, res) {
        req.currentProduct.remove()
            .then(data => {
                return Cart.find({ product: req.currentProduct._id})
            })
            .then(found => {
                if (found.length == 0) {
                    res.status(200).json({
                        msg: req.params.id
                    })
                } else {
                    return Cart.deleteMany({ product: req.currentProduct._id })
                }
            })
            .then(removed => {
                if (removed) {
                    res.status(200).json(removed)
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
    
    static findOne (req, res) {
       res.status(200).json(req.currentProduct)
    }

}
module.exports = ProductController