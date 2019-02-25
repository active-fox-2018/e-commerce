const Product = require('../models/product')

class ProductController {

    static allProduct(req, res) {
        Product  
            .find({})
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static addProduct(req, res) {
        let imageUrl = ""
        if(req.file){
            imageUrl = req.file.cloudStoragePublicUrl
        }
        req.body['image'] = imageUrl
        Product
            .create(req.body)
            .then((product) => {
                res.status(201).json({product, status: "You have successfully added a product"})
            })
            .catch((err) => {
                res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
            })
    }

    static findProduct(req, res) {

    }

    static editProduct(req, res) {
        Product
            .findOneAndUpdate({_id: req.params.productId}, req.body, {new: true})
            .then((updatedProduct) => {
                res.status(200).json({status: "You have successfully updated a product", product: updatedProduct})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static deleteProduct(req, res) {
        Product    
            .findOneAndDelete({_id: req.params.productId})
            .then(() => {
                res.status(200).json({status: "You have successfully deleted a product"})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

}

module.exports = ProductController