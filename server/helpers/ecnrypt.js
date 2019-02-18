const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  encrypt(password) {
    return bcrypt.hashSync(password, salt);
  },
  decrypt(password, input) {
    return bcrypt.compareSync(password, input);
  }
};
