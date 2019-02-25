const jwt = require('jsonwebtoken')
const User = require('../models/user')

function verify(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    User
        .findOne({email: decoded.email})
        .then((user) => {
            if (user) {
                req.userStorage = {}
                req.userStorage.email = user.email
                req.userStorage.id = user._id
                next()
            } else {
                res.status(401).json({status: "Please login with an authenticated account"})
            }
        })
        .catch((err) => {
            res.status(500).json({status: "Internal Server Error"})
        })

}

module.exports = verify