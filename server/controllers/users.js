const { User } = require('../models')
const { comparePass, sign, verify } = require('../helpers')

module.exports = {
    verifyToken(req, res) {
        let { token } = req.body
        try {
            let decoded = verify(token)
            User
                .findOne({email: decoded.email})
                .then(user => {
                    if (user) {
                        res.status(200).json(user)
                    } else {
                        res.status(400).json({msg: 'user not found'})
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        msg: 'internal server error',
                        err: err
                    })
                })
        } catch(err) {
            // console.log(err);
            res.status(500).json({
                msg: 'internal server error',
                err: err
            })
        }
    },
    register(req, res) {
        let data = JSON.parse(req.body.data)
        let newUser = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        }
        if (req.file) {
            newUser.picture = req.file.cloudStoragePublicUrl
        }
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                if (err.errors) {
                    res.status(400).json({err: err.errors})
                } else {
                    console.log(err);
                    res.status(500).json({
                        msg: 'internal server error',
                        err: err
                    })
                }
            })
    },
    login(req, res) {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let token = sign({email: user.email})
                        res.status(200).json({token, user})
                    } else {
                        res.status(400).json({
                            msg: "wrong email / password"
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: "wrong email / password"
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'internal server error',
                    err: err
                })
            })
    }
}