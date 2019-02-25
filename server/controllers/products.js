const { Product } = require('../models')

module.exports = {
    create(req, res) {
        const data = JSON.parse(req.body.data)
        let newProduct = {
            name: data.name,
            price: data.price,
            stock: data.stock
        }
        if (req.file) {
            newProduct.image = req.file.cloudStoragePublicUrl
        }
        Product
            .create(newProduct)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(500).json({
                        msg: "Internal server error",
                        error: err
                    })
                }
            })
    },
    getAll(req, res) {
        Product
            .find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    getOne(req, res) {
        Product
            .findById(req.params.productId)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    },
    update(req, res) {
        const data = JSON.parse(req.body.data)
        let newProduct = {
            name: data.name,
            price: data.price,
            stock: data.stock
        }
        if (req.file) {
            newProduct.image = req.file.cloudStoragePublicUrl
        }
        Product
            .findByIdAndUpdate(req.params.productId, newProduct, {new: true, runValidators: true})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(500).json({
                        msg: "Internal server error",
                        error: err
                    })
                }
            })
    },
    delete(req, res) {
        Product
            .findByIdAndDelete(req.params.productId)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    error: err
                })
            })
    }
}