const jwt = require('jsonwebtoken')
require('dotenv').config

function authentication(req,res, next){
    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        req.user = {
            id : decoded.id,
            email : decoded.email,
            name : decoded.name,
            role : decoded.role
        }
        next()
    }
    catch{
        res.status(401).json({msg:`unauthorized user`})
    }
}

module.exports = authentication