const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');

module.exports = {
  clearProduct(done) {
    if (process.env.NODE_ENV == 'test') {
      Product
        .deleteMany({})
        .then(() => {
          done();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  clearUser(done) {
    if (process.env.NODE_ENV == 'test') {
      User
        .deleteMany({})
        .then(() => {
          done();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  clearCart(done) {
    if (process.env.NODE_ENV == 'test') {
      Cart
        .deleteMany({})
        .then(() => {
          done();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};