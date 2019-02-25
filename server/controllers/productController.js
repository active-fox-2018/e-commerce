const Product = require('../models/product')

class Controller {
    static getAllProducts(req, res) {
        Product.find({}).sort([
            ['created_at', 'descending']
        ])
        .then(products => {
            if (products.length === 0) {
                res
                    .status(200)
                    .json({
                        msg: 'No data in database',
                        products: products
                    })
            } else {
                res 
                    .status(200)
                    .json({
                        products: products
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static getProduct(req, res) {
        // console.log(req.params.id, 'params id')
        // if (req.params.id) res.status(400).json({msg: 'Cannot find product with id undefined'})
        Product.findOne({
            _id: req.params.id
        })
        .then(product => {
            // console.log('haha')
            console.log('product', product)
            if (!product) {
                res
                    .status(404)
                    .json({
                        msg: 'Product not found'
                    })
            } else {
                console.log('ada')
                res
                    .status(200)
                    .json({
                        msg: `Success get data`,
                        product: product
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static addProduct(req, res) {
        // let id = req.decoded.id
        // let data = JSON.parse(req.body.data)
        // console.log(data)
        // console.log(req.file)
        // tag = data.tag.split(' ')
        // let addProduct = {
            //     name: data.name,
            //     price: data.price,
            //     stock: data.stock,
            //     // imageUrl: req.file.cloudStoragePublicUrl
            // }
        let image = req.file ? req.file.cloudStoragePublicUrl : req.body.imageUrl
        let addProduct = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: image,
        };

        // if (addProduct.name.length === 0) res.status(400).json({msg: 'Product name should not be empty'})
        // if (addProduct.stock == 0) res.status(400).json({msg: 'Can not set stock with 0'})
        // if (addProduct.price == 0) res.status(400).json({msg: 'Can not set price with 0'})
        // if (addProduct.imageUrl.length == 0) res.status(400).json({msg: 'Product should own an image'})

        Product.create(addProduct)
        .then(newProduct => {
            res
                .status(201)
                .json(newProduct)
        })
        .catch(err => {
            console.log(err)
            res
                .status(400)
                .json({
                    msg: err.message,
                    err: err
                })
        })
    }

    static editProduct(req, res) {
        Product.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, { new: true })
        .then(updated => {
            res
                .status(200)
                .json({
                    msg: `Product has been successfully updated`
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static removeProduct(req, res) {
        console.log(req.params.id, '===-=----=-=-=') 
        Product.deleteOne({
            _id: req.params.id
        })
        .then(removed => {
            res 
                .status(200)
                .json({
                    msg: `Product has been removed`
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }
}

module.exports = Controller