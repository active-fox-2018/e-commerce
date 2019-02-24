const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearCart = require('../helpers/clearCart')
const clearUser = require('../helpers/clearUser')
const clearProduct = require('../helpers/clearProduct')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { jwtSign } = require('../helpers/jwt')

chai.use(chaiHttp)

describe('Cart test', function () {
  var token = ""
  var myProduct1 = {}
  var myProduct2 = {}

  before(function (done) {
    clearUser(done)
  })

  before(function (done) {
    clearCart(done)
  })

  before(function (done) {
    clearProduct(done)
  })

  before(function (done) {
    User
      .create({
        username: "user1",
        email: "user1@mail.com",
        password: "123456"
      })
      .then(user => {
        token = jwtSign({
          email: user.email,
          _id: user._id,
          role: user.role
        })
        return Cart
          .create({
            userId: user._id
          })
      })
      .then(() => {
        return Product
          .create({
            name: "ASUS 717",
            price: 10000000,
            stock: 43,
            image: "hehe.jpg"
          })
      })
      .then(product1 => {
        myProduct1 = { productId: product1._id }
        return Product
          .create({
            name: "XIAOMI 717",
            price: 10000000,
            stock: 43,
            image: "hehe2.jpg"
          })
      })
      .then(product2 => {
        myProduct2 = { productId: product2._id }
        done()
      })
      .catch(err => {
        // console.log(err)
        done()
      })
  })


  describe('PUT /carts/addToCart', function () {

    it('should return success add to empty cart', function (done) {
      chai
        .request(app)
        .put('/carts/addToCart')
        .send(myProduct1)
        .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(201)
          done()
        })
    })

    it('should return unatuhorized access', function (done) {
      chai
        .request(app)
        .put('/carts/addToCart')
        .send(myProduct1)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

    it('should return success add quantity in cart', function (done) {
      chai
        .request(app)
        .put('/carts/addToCart')
        .send(myProduct1)
        .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(201)
          expect(res.body.data.products[0].quantity).to.equal(2)
          done()
        })
    })

    it('should return success add a different product to cart', function (done) {
      chai
        .request(app)
        .put('/carts/addToCart')
        .send(myProduct2)
        .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(201)
          expect(res.body.data.products.length).to.equal(2)
          done()
        })
    })
  })

  describe('GET /carts/mycart', function () {

    it('should return success fetch', function (done) {
      chai
        .request(app)
        .get('/carts/mycart')
        .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data._id).to.be.a('string')
          expect(res.body.data.userId).to.be.a('string')
          expect(res.body.data.products).to.be.an('array')
          done()
        })
    })

    it('should return unatuhorized access', function (done) {
      chai
        .request(app)
        .put('/carts/mycart')
        .send(myProduct1)
        .end(function (err, res) {
          expect(res).to.have.status(404)
          done()
        })
    })

  })

  describe('PUT /carts/reduceItem', function () {

    it('should return success REDUCE item in cart', function (done) {
      chai
        .request(app)
        .put('/carts/reduceItem')
        .send(myProduct1)
        .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data.products.length).to.equal(2)
          expect(res.body.data.products[0].quantity).to.equal(1)
          done()
        })
    })

    it('should return success unauthorized access', function (done) {
      chai
        .request(app)
        .put('/carts/reduceItem')
        .send(myProduct1)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

    it('should return success REMOVE item in cart', function (done) {
      chai
        .request(app)
        .put('/carts/reduceItem')
        .send(myProduct2)
        .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data.products.length).to.equal(1)
          done()
        })
    })

  })

  describe('PUT /carts/emptyCart', function () {
    it('should return success emptying cart', function (done) {
      chai
        .request(app)
        .put('/carts/emptyCart')
        .set('token', token)
        .end(function (err, res) {
          // console.log(res.body)
          expect(res).to.have.status(200)
          expect(res.body.data.products.length).to.equal(0)
          done()
        })
    })

    it('should return unatuhorized access', function (done) {
      chai
        .request(app)
        .put('/carts/emptyCart')
        .send(myProduct1)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

  })

  after(function (done) {
    clearCart(done)
  })

  after(function (done) {
    clearProduct(done)
  })

  after(function (done) {
    clearUser(done)
  })
})


