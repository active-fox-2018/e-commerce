const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = {
    hashingPw: function (input) {
        return bcrypt.hashSync(input, saltRounds)
    },
    comparePw: function(input, hashedPw) {
        return bcrypt.compareSync(input, hashedPw)
    }
}
