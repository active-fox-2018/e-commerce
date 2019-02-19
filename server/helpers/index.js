const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10);

module.exports = {
    genPass (input) {
        return bcrypt.hashSync(input, salt)
    },
    comparePass (input, pass) {
        return bcrypt.compareSync(input, pass)
    },
    verifyJwt (token) {
        return jwt.verify(token, process.env.JWT)
    },
    signJwt (id) {
        return jwt.sign({id}, process.env.JWT)
    }
}