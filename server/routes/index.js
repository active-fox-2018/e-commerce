const routes = require('express').Router();
const productRoutes = require('./product/index');
const userRoutes = require('./user/index');
const cartRoutes = require('./cart/index');

routes.get('/', (req, res) => {
  res.status(200).json({ mesage: 'Connected' });
});

routes.use('/products', productRoutes);
routes.use('/', userRoutes);
routes.use('/carts', cartRoutes);

module.exports = routes;