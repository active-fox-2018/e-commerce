function isAdmin(req, res, next) {
    console.log(req.decoded)
    if (req.decoded.role !== 'admin') {
        console.log('masuk')
        res
            .status(401)
            .json({
                msg: `UNAUTHORIZED ACCESS: Make sure you have an access to do this action`
            })
    } else {
        // console.log('next')
        next()
    }
}

module.exports = isAdmin