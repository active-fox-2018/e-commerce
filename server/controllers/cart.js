const Cart = require('../models/cartModel');

module.exports = {
  addItemsToCart(req, res) {
    // console.log(req.auth_user._id)
    // console.log(req.params.productId);
    Cart
      .findOne({
        userId: req.auth_user._id
      })
      .populate('userId')
      .then(cart => {
        if (!cart) {
          return Cart
            .create({
              userId: req.auth_user._id,
              products: req.params.productId
            })
        } else {
          // cart.products.push(req.params.productId)
          // return cart.save()
          // return cart.updateOne({
          //   $push: {products: req.params.productId}
          // })
          return Cart
            .findOneAndUpdate(
              { _id: carts[0]._id },
              { $push: { products: req.params.productId } },
              { new: true }
            )
          // .populate('userId')
          // .populate('products')
        }
      })
      .then(result => {
        console.log(result.products, '=====')
        return result
          .populate('userId')
          .populate('products')
          .execPopulate()
        // return Cart
        //   .findOne({
        //     userId: req.auth_user._id
        //   })
        //   .populate('userId')
        //   .populate('products')
        //   .exec()

      })
      .then(upcart => {
        res.status(200).json({ upcart });
      })
      .catch(err => {
        console.log(err)
      })
    // .then(cart => {
    //   console.log(cart, '=======>>>>>>>>>>>>>');
    //   // res.status(200).json(cart);
    // })c

    // .catch(error => {
    //   console.log('asdsad', error);
    // });
    // .create({
    //   userId: req.auth_user._id,
    //   products: req.params.productId
    // })
    // .then((result) => {
    //   res.status(201).json(result);
    // })
    // .catch((error) => {
    //   res.status(500).json(error);
    // });
  },
  removeItemsFromCart() {

  }
};
