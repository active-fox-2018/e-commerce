const User = require('../models/user')
const { generate } = require('../helpers/jwt')
const { decrypt } = require('../helpers/bcryptjs')
const Cart = require('../models/cart')

class Controller {
    static signUp(req, res) {
        let input = {
            email: req.body.email,
            full_name: req.body.full_name,
            password: req.body.password,
            role: req.body.role || 'user'
        }

        User.create(input)
        .then(newUser => {
            return Cart.create({
                userId: newUser._id
            })
            .then(cartCreated => {
                console.log(cartCreated)
                let token = generate(newUser)
                res
                    .status(201)
                    .json(token)
            })
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
        // console.log(req.body)
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .json({
                        msg: `User not found`
                    })
            } else {
                let authorized = decrypt(req.body.password, user.password)
                if (!authorized) {
                    res
                        .status(401)
                        .json({
                            msg: `Wrong password`
                        })
                } else {
                    let token = generate(user)
                    res
                        .status(200)
                        .json({
                            token: token,
                            user: user.full_name,
                            role: user.role,
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

    static addUser(req, res) {
        User.create(req.body)
        .then(newUser => {
            res
                .status(201)
                .json(newUser)
        })
        .catch(err => {
            // console.log(err)
            if(err.message) {
                res.status(400).json({msg:err.message})
            } else {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err: err
                    })
            }
        })
    }

    static getUsers(req, res) {
        User.find({})
        .then(users => {
            // console.log(users.length)
            if (users.length == 0) {
                res
                    .status(404)
                    .json({
                        msg: `There is no data in database`
                    })
            } else {
                res
                    .status(200)
                    .json({
                        users: users
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static getUser(req, res) {
        User.findOne({
            _id: req.params.id
        })
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .json({
                        msg: 'user not found'
                    })
            } else {
                console.log('ada')
                res
                    .status(200)
                    .json({
                        msg: `Success get data`,
                        user: user
                    })
            }
        })
        .catch(err => {
            // console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static editUser(req, res) {
        User.findByIdAndUpdate({
            _id: req.params.id,
        }, req.body, { new: true })
        .then(edited => {
            res
                .status(200)
                .json({
                    msg: 'User has been updated'
                })
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