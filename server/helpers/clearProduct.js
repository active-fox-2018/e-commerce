const Product = require('../models/productModel');

module.exports = (done) => {
  if (process.env.NODE_ENV == 'test') {
    return Product
      .deleteMany({})
  }
};
