const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

function verify(req, res, next) {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    Admin
        .findOne({username: decoded.username})
        .then((admin) => {
            if (admin) {
                req.adminStorage = {}
                req.adminStorage.username = admin.username
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