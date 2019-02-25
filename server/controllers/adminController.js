const Admin = require('../models/admin')
const { decrypt } = require('../helpers/bcryptjs')
const { jwtAdmin } = require('../helpers/jwt')

class Controller {
    static register(req, res) {
        Admin.create(req.body)
        .then(newAdmin => {
            let token = jwtAdmin(newAdmin)
            res
                .status(201)
                .json(token)
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal Server Error`,
                    err: err
                })
        })
    }

    static login(req, res) {
        console.log(req.body)
        Admin.findOne({
            email: req.body.email
        })
        .then(admin => {
            console.log(admin)
            if (!admin) {
                res
                    .status(404)
                    .json({
                        msg: `Admin not found`
                    })
            } else {
                let authorized = decrypt(req.body.password, admin.password)
                if (!authorized) {
                    res
                        .status(401)
                        .json({
                            msg: `Anda belum login`
                        })
                } else {
                    let token = jwtAdmin(admin)
                    res
                        .status(200)
                        .json({
                            token: token
                        })
                }
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }
}

module.exports = Controller