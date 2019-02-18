const routes = require('express').Router();
const { createProduct, findAllProduct, updateProduct, deleteProduct } = require('../../controllers/product');

routes.post('/', createProduct);
routes.get('/', findAllProduct);
routes.put('/:id', updateProduct);
routes.delete('/:id', deleteProduct);

module.exports = routes;