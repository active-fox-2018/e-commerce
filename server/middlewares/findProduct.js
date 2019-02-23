const Product = require('../models/Product')

module.exports = {
    findOneProduct: (req, res, next) => {
        Product
            .findById(req.body.productId)
            .then((result) => {
                if(req.body.qty > result.stock) {
                    res.status(400).json({msg: 'Not Enough Qty!'})
                } else {
                    req.productStock = result.stock
                    next() 
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    }
}