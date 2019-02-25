const Admin = require("../models/admin")
const jwt = require('jsonwebtoken')
const Password = require('../helpers/password-encrypt-decrypt')

class AdminController {
    static create(req, res) {
        Admin
            .create(req.body)
            .then((admin) => {
                res.status(201).json({admin: admin})
            })
            .catch((err) => {
                if (err.name === "MongoError") {
                    res.status(400).json({status: "Sorry, Username has been used"})
                } else {
                    res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
                }
            })
    }

    static login(req, res) {
        Admin
            .findOne({username: req.body.username})
            .then((admin) => {
                if (admin) {
                    let isMatch = Password.decodePassword(req.body.password, admin.password)
                    if (isMatch) {
                        let token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET);
                        res.status(200).json({status: "You have successfully logged in as an Admin", token})
                    } else {
                        res.status(400).json({status: "Sorry, wrong password"})
                    }
                } else {
                    res.status(400).json({status: "Sorry, Username is not registered"})
                }
            })
            .catch((err) => {
                res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
            })
    }
}

module.exports = AdminController