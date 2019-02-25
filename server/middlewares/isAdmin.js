
require('dotenv').config()

function isAdmin(req, res, next) {
    try {

        if (req.role == 'admin') {
            console.log('middleware lewat');
            
            next()
        } else {
            res.status(402).json({ message: 'not authorize' })
        }


    } catch (err) {

        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = isAdmin