const { verify } = require('../helpers')
const { User, Cart } = require('../models')

module.exports = {
    isLogin(req, res, next) {
        let { token } = req.headers
        try {
            let decoded = verify(token)
            User
                .findOne({email: decoded.email})
                .then(user => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(400).json({
                            msg: 'user not found'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        msg: 'Internal server err',
                        err: err
                    })
                })
        } catch(err) {
            console.log(err);
            res.status(500).json({
                msg: 'Internal server err',
                err: err
            })
        }
    },
    isAdmin(req, res, next) {
        if (req.user.role === "admin") {
            next()
        } else {
            res.status(400).json({
                msg: 'youre not admin'
            })
        }
    },
    findCart(req, res, next) {
        Cart
            .findOne({userId: req.user._id})
            .populate('products.productId')
            .then(cart => {
                if (cart) {
                    req.userCart = cart
                    next()
                } else {
                    res.status(400).json({
                        msg: 'cart not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal server err',
                    err: err
                })
            })
    }
}