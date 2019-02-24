const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { comparePass, signJwt } = require('../helpers')

class UserController {

    static gooSign (req, res) {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            User.findOne({ email: payload.email })
                .then(found => {
                    if (found) {
                        res.status(200).json({
                            token: signJwt(found._id),
                            data: found
                        })
                    } else {
                        return User.create({
                            name: payload.name,
                            email: payload.email,
                            image: payload.picture,
                            password: process.env.PASS_GOOGLE
                        })
                    }
                })
                .then(data => {
                    if (data) {
                        res.status(201).json({
                            token: signJwt(data._id),
                            data
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
        verify().catch(console.error)
    }

    static create(req, res) {
        let name = req.body.name
        let image = null
        if (req.file) {
            image = req.file.cloudStoragePublicUrl
        }
        let email = req.body.email
        let password = req.body.password
        let address = req.body.address
        let phone = req.body.phone
        // let role = req.body.role


        if ( !name || !email || !password || !address) {
            res.status(400).json({
                msg: `Please fill name, email, address and password`
            })
        } else {
            let user = {
                name, image, email, password, role, address, phone
            }

            for(let i in user) {
                if (!user[i]) delete user[i]
            }

            User.create(user)
            .then(data => {
                res.status(201).json({
                    data,
                    token: signJwt(data._id)
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message,
                    err
                })
            })
        }
    }

    static login(req, res) {
        if (!req.body.input || !req.body.password) {
            res.status(400).json({
                msg: `All field must be filled`
            })
        } else {
            let q = { $or: [ { email: req.body.input }, { phone: req.body.input } ] }
            User.findOne(q)
                .then(data => {
                    if (data) {
                        if (comparePass(req.body.password, data.password)) {
                            res.status(200).json({
                                token: signJwt(data._id),
                                data
                            })
                        } else {
                            res.status(400).json({
                                msg: `Wrong password / email / phone`
                            })
                        }
                    } else {
                        res.status(404).json({
                            msg: 'Please register first'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })

        }
    }

    static findAll(req, res) {
        User.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static getProfile(req, res) {
       res.status(200).json(req.currentUser)
    }

    static update(req, res) {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                msg: `Please fill something`
            })
        } else {
            let name = req.body.name
             let image = null
             if (req.file) {
                 image = req.file.cloudStoragePublicUrl
             }
             let email = req.body.email
             let password = req.body.password
             let address = req.body.address
             let phone = req.body.phone
             let role = req.body.role
     
             let upUser = {
                 name, image, email, password, address, phone, role
             }
             
             for (let i in upUser) {
                 if ( !upUser[i] || upUser[i] == 'undefined') delete upUser[i]
             }
     
             if (!upUser.hasOwnProperty('password')) {
                 req.currentUser.useOldPassword = true;
             }
     
             req.currentUser.set(upUser)
             req.currentUser.save()
                 .then(data => {
                     res.status(200).json(data)
                 })
                 .catch(err => {
                     res.status(500).json({
                         msg: err.message
                     })
                 })

        }
    }

    static delete(req, res) {
        req.currentUser.remove()
            .then(del => {
                res.status(200).json(del)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = UserController