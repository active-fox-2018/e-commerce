const routes = require('express').Router();
const { register, login, checkUser } = require('../../controllers/user');
const { Auth } = require('../../middlewares/authUser');

routes.post('/signup', register);
routes.post('/signin', login);
routes.get('/auth', Auth, checkUser);

module.exports = routes;