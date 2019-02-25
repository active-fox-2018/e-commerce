const { Product } = require('../models')

module.exports = function(done) {
  if (process.env.NODE_ENV === 'test') {
    Product
      .deleteMany()
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  }
};