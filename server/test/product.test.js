let Product = require('../models/productModel');

const
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app');

const { clearProduct } = require('../helpers/clearTesting');
chai.use(chaiHttp);

let dummyProduct;

describe('CRUD Product', function () {

  beforeEach(function (done) {
    // console.log('===================> before testing product');
    const sampleProduct = {
      productName: 'The Book of Narnia',
      description: 'sample description',
      price: 100000,
      stock: 10
    }
    Product
      .create(sampleProduct)
      .then((response) => {
        dummyProduct = response
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  afterEach(function (done) {
    // console.log('===================> after testing product');
    clearProduct(done);
  });

  describe('GET /products', function () {
    it('should return all Products with status code 200', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          // console.log(res.body);
          // console.log(dummyProduct);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('_id');
          expect(res.body.data[0]).to.have.property('productName');
          expect(res.body.data[0]).to.have.property('description');
          expect(res.body.data[0]).to.have.property('price');
          expect(res.body.data[0]).to.have.property('stock');
          expect(res.body.data[0].productName).to.equal(dummyProduct.productName);
          expect(res.body.data[0].description).to.equal(dummyProduct.description);
          expect(res.body.data[0].price).to.equal(dummyProduct.price);
          expect(res.body.data[0].stock).to.equal(dummyProduct.stock);
          done();
        });
    });
  });

  describe('POST /products', function () {
    it('should return a new Product with status code 201', function (done) {
      const addProduct = {
        productName: 'The Lord of the Rings',
        description: 'sample product',
        price: 120000,
        stock: 20
      }
      chai
        .request(app)
        .post('/products')
        .send(addProduct)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(addProduct.productName);
          expect(res.body.data.description).to.equal(addProduct.description);
          expect(res.body.data.price).to.equal(addProduct.price);
          expect(res.body.data.stock).to.equal(addProduct.stock);
          done();
        });
    });

    it('should return error when product name is empty', function (done) {
      let invalidProduct = {
        productName: '',
        description: 'sample description',
        price: 120000,
        stock: 20
      }
      chai
        .request(app)
        .post('/products')
        .send(invalidProduct)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Product name cannot be empty');
          done();
        });
    });

    it('should return error when description is empty', function (done) {
      let invalidProduct = {
        productName: 'sample book',
        description: '',
        price: 120000,
        stock: 20
      }
      chai
        .request(app)
        .post('/products')
        .send(invalidProduct)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Description cannot be empty');
          done();
        });
    });

    it('should return error when price is empty', function (done) {
      let invalidProduct = {
        productName: 'The Book of Narnia',
        description: 'sample description',
        price: '',
        stock: 20
      }
      chai
        .request(app)
        .post('/products')
        .send(invalidProduct)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Price cannot be empty');
          done();
        });
    });

    it('should return error when product name is empty', function (done) {
      let invalidProduct = {
        productName: 'The Book of Narnia',
        description: 'sample description',
        price: 120000,
        stock: ''
      }
      chai
        .request(app)
        .post('/products')
        .send(invalidProduct)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Please input the stock!');
          done();
        });
    });
  });

  describe('GET /products/:id', function () {
    it('should get product by id with status code 200', function (done) {
      chai
        .request(app)
        .get('/products/' + dummyProduct._id)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName')
          expect(res.body.data).to.have.property('description')
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(dummyProduct.productName);
          expect(res.body.data.description).to.equal(dummyProduct.description);
          expect(res.body.data.price).to.equal(dummyProduct.price);
          expect(res.body.data.stock).to.equal(dummyProduct.stock);
          done();
        });
    });

    it('should return empty object when product not found', function (done) {
      chai
        .request(app)
        .get('/product/' + '1234567890')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /products/:id', function () {

    it('shoud update a product given by id with status code 200', function (done) {
      // console.log(dummyUpdate, '====> dummy');
      // console.log(testData, '=====> testData');
      let sampleUpdate = {
        productName: 'The Chronicles of Narnia',
        description: 'sample description',
        price: 100000,
        stock: 30
      }
      chai
        .request(app)
        .put('/products/' + dummyProduct._id)
        .send(sampleUpdate)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(sampleUpdate.productName);
          expect(res.body.data.description).to.equal(sampleUpdate.description);
          expect(res.body.data.price).to.equal(sampleUpdate.price);
          expect(res.body.data.stock).to.equal(sampleUpdate.stock);
          done();
        });
    });
  });

  describe('DELETE /producst/:id', function () {
    it('should DELETE a product given the id with status code 200', function (done) {
      chai
        .request(app)
        .delete('/products/' + dummyProduct._id)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.be.an('object');
          expect(res.body.data).to.have.property('_id');
          expect(res.body.data).to.have.property('productName');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('stock');
          expect(res.body.data.productName).to.equal(dummyProduct.productName);
          expect(res.body.data.description).to.equal(dummyProduct.description);
          expect(res.body.data.price).to.equal(dummyProduct.price);
          expect(res.body.data.stock).to.equal(dummyProduct.stock);
          done();
        });
    });
  });

});
