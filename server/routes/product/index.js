const routes = require('express').Router();
const { createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct } = require('../../controllers/product');

routes.post('/', createProduct);
routes.get('/', findAllProduct);
routes.get('/:id', findOneProduct);
routes.put('/:id', updateProduct);
routes.delete('/:id', deleteProduct);

module.exports = routes;