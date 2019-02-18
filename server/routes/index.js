const routes = require('express').Router();
const productRoutes = require('./product/index');
const userRoutes = require('./user/index');
routes.get('/', (req, res) => {
  res.status(200).json({ mesage: 'Connected' });
});

routes.use('/products', productRoutes);
routes.use('/', userRoutes)

module.exports = routes;