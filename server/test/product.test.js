let Product = require('../models/productModel');
let User = require('../models/userModel');
// Cart

const
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app');

const clearProduct = require('../helpers/clearProduct');
chai.use(chaiHttp);

before(function (done) {
  clearProduct(done);
});

after(function (done) {
  clearProduct(done);
});

var token = ''

//register post /users


describe('CRUD Product', function () {

  describe('GET /products', function () {
    it('should GET all Products with status code 200', function (done) {
      chai
        .request(app)
        .get('/products')
        // .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /products', function () {
    it('should CREATE a Product with status code 201', function (done) {
      const newProduct = {
        productName: 'The Lord of the Rings',
        price: 120000,
        stock: 20
      }
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(newProduct.productName);
          expect(res.body.data.price).to.equal(newProduct.price);
          expect(res.body.data.stock).to.equal(newProduct.stock);
          done();
        });
    });
  });

  describe('PUT /products/:id', function () {
    it('shoud UPDATE a product given the id with status code 200', function (done) {
      const product = new Product({
        productName: 'The Chronicles of Narnia',
        price: 100000,
        stock: 30
      })
      chai
        .request(app)
        .put('/products/' + product.id)
        .send(product)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          done();
        });
    });
  });

  describe('DELETE /producst/:id', function () {
    it('should DELETE a product given the id with status code 200', function (done) {
      const product = new Product({
        productName: 'The Lord of the Rings',
        price: 120000,
        stock: 20
      })
      chai
        .request(app)
        .delete('/products/' + product.id)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          done();
        });
    });
  });

});