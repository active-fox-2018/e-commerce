const verifyToken = require('../helpers/verifyToken')
const User = require('../models/User')

function adminAuth(req, res, next) {
    const email = verifyToken(req, res).email
    User
        .findOne({email: email})
        .then((user) => {
            if (user) {
                if (user.role == 'admin') {
                    req.current_user = user
                    next()
                } else {
                    res.status(401).json({msg: 'Not Authorize'})    
                }
            } else {
                res.status(401).json({msg: 'Please Login first!'})
            }
        })
        .catch((err) => {
            res.status(500).json(err)
            console.log(err)
        });
}

module.exports = adminAuth