const bcrypt = require('bcryptjs')

class Password {
    static hashPassword(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        return hash
    }

    static decodePassword(password, hash) {
        return bcrypt.compareSync(password, hash); 
    }
}

module.exports = Password