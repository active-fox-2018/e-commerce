const routes = require('express').Router();
const { Auth } = require('../../middlewares/authUser');
const { addItemsToCart } = require('../../controllers/cart');

routes.use(Auth);
routes.post('/:productId', addItemsToCart);

module.exports = routes;