const Product = require('../models/Product')

module.exports = {
    findOneProduct: (req, res, next) => {
        Product
            .findById(req.body.productId)
            .then((result) => {
                req.productStock = result.stock 
                next() 
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    }
}