let Product = require('../models/productModel');

const
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app');

const clearProduct = require('../helpers/clearProduct');
chai.use(chaiHttp);

let testData = {};

before(function (done) {
  clearProduct()
    .then(() => {
      return Product
        .create({
          productName: 'The Lord of the Rings',
          price: 120000,
          stock: 20
        })
    })
    .then(data => {
      testData = data
      done();
    })
    .catch(error => {
      console.log(error);
    });
});

after(function (done) {
  clearProduct()
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
});


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
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.haveOwnProperty('_id');
          expect(res.body.data[0]).to.haveOwnProperty('productName');
          expect(res.body.data[0]).to.haveOwnProperty('price');
          expect(res.body.data[0]).to.haveOwnProperty('stock');
          expect(res.body.data[0].productName).to.equal(testData.productName);
          expect(res.body.data[0].price).to.equal(testData.price);
          expect(res.body.data[0].stock).to.equal(testData.stock);
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
          // console.log(res.body, 'POST');
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

  describe('GET /products/:id', function () {
    it('should GET product by id with status code 200', function (done) {
      chai
        .request(app)
        .get('/products/' + testData._id)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.haveOwnProperty('_id');
          expect(res.body.data).to.haveOwnProperty('productName')
          expect(res.body.data).to.haveOwnProperty('price');
          expect(res.body.data).to.haveOwnProperty('stock');
          expect(res.body.data.productName).to.equal(testData.productName);
          expect(res.body.data.price).to.equal(testData.price);
          expect(res.body.data.stock).to.equal(testData.stock);
          done();
        });
    });
  });

  describe('PUT /products/:id', function () {
    
    let dummyUpdate = {};
    before(function (done) {
      Product.create({
        productName: 'The Chronicles of Narnia',
        price: 100000,
        stock: 30
      })
        .then(data => {
          dummyUpdate = data;
          done();
        })
        .catch(error => {
          console.log(error);
          done();
        });

    });
    it('shoud UPDATE a product given the id with status code 200', function (done) {
      // console.log(dummyUpdate, '====> dummy');
      // console.log(testData, '=====> testData');
      chai
        .request(app)
        .put('/products/' + testData._id)
        .send(dummyUpdate)
        .end(function (err, res) {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(dummyUpdate.productName);
          expect(res.body.data.price).to.equal(dummyUpdate.price);
          expect(res.body.data.stock).to.equal(dummyUpdate.stock);
          done();
        });
    });
  });

  describe('DELETE /producst/:id', function () {
    let dummyDelete = {};
    before(function (done) {
      Product.create({
        productName: 'Harry Potters',
        price: 150000,
        stock: 30
      })
      .then(data => {
        dummyDelete = data;
        done();
      })
      .catch(error => {
        console.log(error);
        done();
      });
    })
    it('should DELETE a product given the id with status code 200', function (done) {
      const product = new Product({
        productName: 'The Lord of the Rings',
        price: 120000,
        stock: 20
      })
      chai
        .request(app)
        .delete('/products/' + dummyDelete._id)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(dummyDelete.productName);
          expect(res.body.data.price).to.equal(dummyDelete.price);
          expect(res.body.data.stock).to.equal(dummyDelete.stock);
          done();
        });
    });
  });

});