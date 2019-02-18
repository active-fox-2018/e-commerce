const mognoose = require('mongoose');
const Schema = mognoose.Schema;
const { encrypt } = require('../helpers/ecnrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  email: {
    type: String,
    required: [true, 'Please input your email'],
    validate: {
      isAsync: true,
      validator: function (value) {
        return new Promise((resolve, reject) => {
          User
            .findOne({
              email: value,
              _id: { $ne: this._id }
            })
            .then(user => {
              if (user) {
                reject(false);
              } else {
                resolve(true);
              }
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      message: 'Email already exists'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty']
  }
});

userSchema.pre('save', function (next) {
  this.password = encrypt(this.password);
  next();
});

const User = mognoose.model('User', userSchema);
module.exports = User;