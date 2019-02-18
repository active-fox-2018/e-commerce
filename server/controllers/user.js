const User = require('../models/userModel');
const { decrypt } = require('../helpers/ecnrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register(req, res) {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(201).json({
          user,
          message: 'Successfully register'
        })
      })
      .catch(error => {
        // console.log(error.errors);
        var errorMessage = error.errors;
        if (errorMessage.hasOwnProperty('name')) {
          res.status(400).json(errorMessage.name.message);
        } else if (errorMessage.hasOwnProperty('email')) {
          res.status(400).json(errorMessage.email.message);
        } else if (errorMessage.hasOwnProperty('password')) {
          res.status(400).json(errorMessage.password.message);
        } else {
          res.status(500).json(error);
        }
      });
  },
  login(req, res) {
    User
      .findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          const isValid = decrypt(req.body.password, data.password);
          if (isValid) {
            const access_token = jwt.sign({ data }, process.env.SECRET);
            res.status(200).json({
              access_token,
              message: 'Successfully login'
            })
          } else {
            res.status(404).json({
              error: 'Wrong Password'
            });
          }
        } else {
          res.status(404).json({
            error: 'Email is not registered'
          });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }

};
