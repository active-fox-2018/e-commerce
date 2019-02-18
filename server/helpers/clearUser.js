const User = require('../models/userModel');

module.exports = (done) => {
  User
  .deleteMany({})
  .then(() => {
    done();
  })
  .catch(error => {
    console.log(error);
  });
}
