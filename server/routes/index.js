const routes = require('express').Router();
const productRoutes = require('./product/index');
routes.get('/', (req, res) => {
  res.status(200).json({ mesage: 'Connected' });
});

routes.use('/products', productRoutes);

module.exports = routes;