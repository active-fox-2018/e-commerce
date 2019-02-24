const Product = require('../models/Product')

module.exports = {
    createProduct : (req, res) => {
        let newProduct = { name, description, price, category } = req.body
        if(!req.file) {
            newProduct.img = null
        } else {
            newProduct.img = req.file.cloudStoragePublicUrl
        }
        Product
            .create(newProduct)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    findAllProduct: (req, res) => {
        Product
            .find({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })

    },
    findOneProduct: (req, res) => {
        Product
            .findById(req.params.id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    updateProduct: (req, res) => {
        //validati controller pindahin middleware
        // if(!req.body.name) {
        //     res.status(404).json({msg: 'Product name cannot be empy'})
        // } else if (!req.body.price) {
        //     res.status(404).json({msg: 'Product price cannot be empy'})
        // } else if (!req.params.id) {
        //     res.status(404).json({msg: 'User not authenticate'})
        // } else {
            console.log(req.params.id, '====================')
            for(let key in req.body) {
                if(!req.body[key]) delete req.body[key]
            }
            let productData = { name, description, price, category } = req.body
            if(!req.file) {
                delete req.file
            } else {
                productData.img = req.file.cloudStoragePublicUrl
            }
            Product
                .findByIdAndUpdate(req.params.id, {$set: productData}, {new: true})
                .then(updatedProduct => {
                    res.status(200).json(updatedProduct)
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        // }
    },
    deleteProduct: (req, res) => {
        if (!req.params.id) {
            res.status(404).json({msg: 'User not authenticate'})
        } else {
            Product
                .findByIdAndDelete(req.params.id)
                .then(deletedProduct => {
                    res.status(200).json(deletedProduct)
                })
                .catch(err => {
                    res.status(500).json({
                        msg: 'Internal Server Error',
                        err: err.message
                    })
                })
        }
    }
}