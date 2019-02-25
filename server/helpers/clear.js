const Product = require('../models/product');
const User = require('../models/user')
const Cart = require('../models/cart')

module.exports = {
  clearProduct : function(done) {
      Product
        .deleteMany({})
        .then( function() {
          done();
        })
        .catch( function(err) {
          console.log(err);
        });
  },

  clearUser : function(done) {
      User
        .deleteMany({})
        .then( function() {
          done();
        })
        .catch( function(err) {
          console.log(err);
          done()
        });
  },

  clearCart : function(done) {
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
