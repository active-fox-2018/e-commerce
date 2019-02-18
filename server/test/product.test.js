const
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app');

const clearProduct = require('../helpers/clearProduct');
const Product = require('../models/product');
chai.use(chaiHttp);


before(function (done) {
  clearProduct(done);
});

after(function (done) {
  clearProduct(done);
});


describe('CRUD Product', function () {
  describe('POST /products', function () {
    it('should CREATE a Product with status code 201', function (done) {
      const newProduct = {
        productName: 'Lord of the Rings',
        price: 80000,
        stock: 10
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

  describe('GET /products', function () {
    it('should GET all Products with status code 200', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('PUT /products/:id', function () {
    it('shoud UPDATE a product given the id with status code 200', function (done) {
      const product = {
        name: 'The Book of Narnia',
        price: 50000,
        stock: 5
      }
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
      const product = {
        name: 'The Book of Hmmm',
        price: 50000,
        stock: 15
      }
      chai
        .request(app)
        .delete('/products/' + product.id)
        .end(function (err, res) {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          done();
        });
    });
  });

});