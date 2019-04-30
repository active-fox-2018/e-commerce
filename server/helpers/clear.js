const Product = require('../models/product');
const User = require('../models/user')
const Cart = require('../models/cart')

module.exports = {
  clearProduct : function(done) {
    if (process.env.NODE_ENV === 'test') {
      Product
        .deleteMany({})
        .then( function() {
          done();
        })
        .catch( function(err) {
          console.log(err);
        });
    }
  },

  clearUser : function(done) {
    if (process.env.NODE_ENV === 'test') {
      User
        .deleteMany({})
        .then( function() {
          done();
        })
        .catch( function(err) {
          console.log(err);
        });
    }
  },

  clearCart : function(done) {
    if (process.env.NODE_ENV === 'test') {
      Cart
        .deleteMany({})
        .then( function() {
          done()
        })
        .catch( function(err) {
          console.log(err)
        })
    }
  }
}