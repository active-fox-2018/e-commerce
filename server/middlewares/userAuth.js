const verifyToken = require('../helpers/verifyToken')
const User = require('../models/User')
const Cart = require('../models/Cart')

function userAuth(req, res, next) {
    const email = verifyToken(req, res).email
    User
        .findOne({email: email})
        .then((user) => {
            if (user) {
                if (user.role == 'buyer' || user.role == 'admin') {
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
    // let id;
    // let tempUser;
    // User
    //     .findOne({email: email})
    //     .then(user => {
    //         if(user) {
    //             id = user._id
    //             tempUser = user

    //             return Cart.findById(req.params.id)
    //         } else {
    //             // ini ga bakal nge berhentiin 
    //             // then di bawahnya masih tetep jalan
    //             // return {
    //             //     status: 403,
    //             //     msg: 'not authorized'
    //             // }
    //             console.log('masuk else?')
    //             res.status(403).json({
    //                 msg: 'not authorize',
    //             })
    //         }
    //     })
    //     .then(cart => {
    //         if(!cart) {
    //             req.current_user = tempUser
    //             console.log('masuk if next')
    //             next()
    //         } else {
    //             let strId = id.toString()
    //             let strUserId = cart.userId.toString()
    //             if(strId === strUserId && tempUser.role === 'buyer') {
    //                 req.current_user = tempUser
    //                 next()
    //             } else {
    //                 res.status(403).json({
    //                     msg: 'not authorize',
    //                 })
    //             }
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             msg: 'internal server error',
    //             error: err
    //         })
    //     }) 
}

module.exports = userAuth