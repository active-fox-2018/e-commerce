const Cart = require('../models/chartModel');

module.exports = {
  addItemsToCart(req, res) {
    Cart
      .findOne({
        userId: req.auth_user._id
      })
      .populate('userId')
      .populate('products')
      .then(data => {
        console.log(data);
      })
      .catch(error => {

      });
  },
  removeItemsFromCart() {

  }
};
