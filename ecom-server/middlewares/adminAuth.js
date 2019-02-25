
function authorization(req,res,next){
    //role check
    if ( req.user.role === 'admin')
    next()
    else {
        res.status(401).json({
            msg : `user not authorized to view this page`
        })
    }
}

module.exports = authorization