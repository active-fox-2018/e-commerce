const Product = require('../models/productModel');

module.exports = (done) => {
  if (process.env.NODE_ENV == 'test') {
    Product
      .deleteMany({})
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
