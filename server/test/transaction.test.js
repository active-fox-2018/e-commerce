const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearCart = require('../helpers/clearCart')
const clearUser = require('../helpers/clearUser')
const clearProduct = require('../helpers/clearProduct')
const clearTransaction = require('../helpers/clearTransaction')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { jwtSign } = require('../helpers/jwt')

chai.use(chaiHttp)

describe('transaction test', function () {
  var tokenUser = ""
  var userInfo = ""
  var tokenAdmin = ""
  var adminInfo = ""
  var userProduct = ""
  var userCart = ""
  var transactionId = ""

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
    clearTransaction(done)
  })

  before(function (done) {

    User
      .create({
        username: "admin1",
        email: "admin1@mail.com",
        password: "123456",
        role: 'admin'
      })
      .then(admin => {
        adminInfo = admin
        tokenAdmin = jwtSign({
          email: admin.email,
          _id: admin._id,
          role: admin.role
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
      .then(product => {
        userProduct = { productId: product._id }

        return User
          .create({
            username: "user1",
            email: "user1@mail.com",
            password: "123456"
          })
      })
      .then(user => {
        userInfo = user
        tokenUser = jwtSign({
          email: user.email,
          _id: user._id,
          role: user.role
        })
        return Cart
          .create({
            userId: user._id,
            products: [{
              productId: userProduct
            }, {
              quantity: 2
            }]
          })
      })
      .then(() => {
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  describe('POST /transactions', function () {
    it('should return create transaction success', function (done) {
      var body = {
        cartId: userCart._id,
        totalPrice: 20000000,
        shippingCost: 100000,
        finalPrice: 2100000
      }

      chai
        .request(app)
        .post('/transactions')
        .send(body)
        .set('token', tokenUser)
        .end(function (err, res) {
          transactionId = res.body.data._id
          expect(res).to.have.status(201)
          expect(res.body.data.userId.toString()).to.equal(userInfo._id.toString())
          expect(res.body.data.cartId).to.equal(body.cartId)
          expect(res.body.data.totalPrice).to.equal(body.totalPrice)
          expect(res.body.data.shippingCost).to.equal(body.shippingCost)
          expect(res.body.data.finalPrice).to.equal(body.finalPrice)
          expect(res.body.data.status).to.equal('Products on delivery')
          done()
        })
    })

    it('should return unauthorized access', function (done) {
      var body = {
        cartId: userCart._id,
        totalPrice: 20000000
      }

      chai
        .request(app)
        .post('/transactions')
        .send(body)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })
  })

  describe('GET /transactions', function () {
    it("should return 'fetch data success' response", function (done) {
      chai
        .request(app)
        .get('/transactions')
        .set('token', tokenAdmin)
        .end(function (err, res) {
          // console.log('------------------------------',tokenAdmin, adminInfo.role)
          expect(res).to.have.status(200)
          expect(res.body.data.length).to.equal(1)
          done()
        })
    })

    it("should return unauthorized access response", function (done) {
      chai
        .request(app)
        .get('/transactions')
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })

  })

  describe('GET /transactions/user', function () {
    it('should return success find transaction by user', function (done) {
      chai
        .request(app)
        .get(`/transactions/user`)
        .set('token', tokenUser)
        .end(function (err, res) {
          console.log('---------------',res.body)
          expect(res).to.have.status(200)
          // expect(res.body.data.userId.toString()).to.equal(userInfo._id.toString())
          done()
        })
    })

    it('should return unauthorized access', function (done) {
      chai
        .request(app)
        .get(`/transactions/user`)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })
  })

  describe('GET /transactions/status', function () {
    it('should return success fetch data by status', function (done) {
      chai
        .request(app)
        .get('/transactions/status')
        .set('token', tokenAdmin)
        .send({ status: 'Products on delivery' })
        .end(function (err, res) {
          console.log('-------------------', res.body)
          expect(res).to.have.status(200)
          expect(res.body.data.status).to.equal('Products on delivery')
          done()
        })
    })

    it('should return unauthorized access', function (done) {
      chai
        .request(app)
        .get('/transactions/status')
        .set('token', tokenUser)
        .send({ status: 'Products on delivery' })
        .end(function (err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })
  })

  describe('PUT /transactions/status/:id', function () {
    it('should return success update status', function (done) {
      chai
        .request(app)
        .put(`/transactions/status/${transactionId}`)
        .set('token', tokenUser)
        .send({ status: 'delivered' })
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data.status).to.equal('delivered')
          done()
        })
    })

    it('should return unauthorized access', function (done) {
      chai
        .request(app)
        .get(`/transactions/status/${transactionId}`)
        .end(function (err, res) {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

  after(function (done) {
    clearTransaction(done)
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