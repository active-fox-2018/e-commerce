const User = require('../models/userModel');
const Product = require('../models/productModel');

const
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app');

const { clearProduct, clearCart, clearUser } = require('../helpers/clearTesting');
chai.use(chaiHttp);

let token = '';
let productId = '';
let userId = '';
let newUser;


describe('Add and remove items to / in cart with Authorized User', function () {
  before(function (done) {
    // console.log('===================> register before testing cart');
    let dummyUser = {
      name: 'Arief',
      email: 'arrv@gmail.com',
      password: '123'
    }
    User
      .create(dummyUser)
      .then((user) => {
        // console.log(user);
        newUser = user;
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  before(function (done) {
    // console.log('===================> add product before testing cart');
    let dummyProduct = {
      productName: 'The Book of Khanzan',
      description: 'sample description',
      price: 100000,
      stock: 50
    }
    Product
      .create(dummyProduct)
      .then((product) => {
        // console.log(product);
        productId = product._id;
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  after(function (done) {
    // console.log('after =====>');
    clearProduct(done);
  });
  after(function (done) {
    // console.log('after =====>');
    clearCart(done);
  });
  after(function (done) {
    // console.log('after =====>');
    clearUser(done);
  });

  describe('Add to cart', function () {
    it('should return access_token with status code 200', function (done) {
      const userLogin = {
        email: 'arrv@gmail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/users/signin')
        .send(userLogin)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('access_token');
          expect(res.body).to.haveOwnProperty('message');
          token = res.body.access_token;
          done();
        })
    });

    it('should return new object cart with status code 201', function (done) {
      // console.log(token, '======> token');
      // console.log(productId, '=====> productId');
      chai
        .request(app)
        .post('/carts/' + productId)
        .set('token', token)
        .end(function (err, res) {
          // console.log(res.body.upcart.products);
          // expect(err).to.be.null;
          // expect(res).to.have.status(201);
          done();
        });
    });

    it('should return new object cart with status code 201', function (done) {
      // console.log(token, '======> token');
      // console.log(productId, '=====> productId');
      let product2 = new Product({
        productName: 'The Book of Miracle',
        description: 'sample description',
        price: 100000,
        stock: 20
      })
      // console.log(product2._id);
      chai
        .request(app)
        .post('/carts/' + product2._id)
        .set('token', token)
        .end(function (err, res) {
          console.log(res.body.upcart);
          // expect(err).to.be.null;
          // expect(res).to.have.status(201);
          done();
        });
    });

  });
});
