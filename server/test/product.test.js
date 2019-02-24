const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearProduct = require('../helpers/clearProduct')
const clearUser = require('../helpers/clearUser')
const clearCart = require('../helpers/clearCart')
const User = require('../models/User')
const { jwtSign } = require('../helpers/jwt')

chai.use(chaiHttp)

describe('Product tests', function () {

  var paramsId = ""
  var tokenAdmin = ""
  var tokenUser = ""

  before(function (done) {
    clearUser(done)
  })

  before(function (done) {
    User
      .create({
        username: "admin1",
        email: "admin1@mail.com",
        password: "123456",
        role: "admin"
      })
      .then(admin => {
        tokenAdmin = jwtSign({
          email: admin.email,
          _id: admin._id,
          role: admin.role
        })
        return User
          .create({
            username: "user1",
            email: "user1@mail.com",
            password: "123456"
          })
      })
      .then(user => {
        tokenUser = jwtSign({
          email: user.email,
          _id: user._id,
          role: user.role
        })
        done()
      })
      .catch(err => {
        console.log('ERROR!!!', err)
        done()
      })
  })

  before(function (done) {
    clearProduct(done)
  })

  describe("POST /products", function () {
    it('should return success create product', function (done) {
      let newProduct = {
        name: "ASUS 717",
        price: 10000000,
        stock: 43,
        image: 'hehe.jpg',
        imagePreviewURL: 'hehe.jpg'
      }

      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set('token', tokenAdmin)
        .end(function (err, res) {
          console.log('----', err)
          paramsId = res.body.data._id
          expect(res).to.have.status(201)
          expect(res.body.data.name).to.equal("ASUS 717")
          expect(res.body.data.price).to.equal(10000000)
          expect(res.body.data.stock).to.equal(43)
          expect(res.body.data.postedAt).to.not.null
          expect(res.body.message).to.equal("product posted succesfully")
          done()
        })
    })

    it('should return unauthorized access', function (done) {
      let newProduct = {
        name: "ASUS 717",
        price: 10000000,
        stock: 43,
        image: 'hehe.jpg'
      }

      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })

    it("should return name validation error", function (done) {
      let newProduct = {
        price: 10000000,
        stock: 43,
        image: 'hehe.jpg'
      }

      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set('token', tokenAdmin)
        .end(function (err, res) {
          // console.log(res.body.err.name)
          expect(res.body.err.name).to.equal('ValidationError')
          done()
        })

    })

    it("should return price validation error", function (done) {
      let newProduct = {
        name: "Asus",
        stock: 43,
        image: 'hehe.jpg'
      }

      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set('token', tokenAdmin)
        .end(function (err, res) {
          // console.log(res.body.err.name)
          expect(res.body.err.name).to.equal('ValidationError')
          done()
        })
    })
  })

  describe("GET /products", function () {
    it('should return all products', function (done) {

      chai
        .request(app)
        .get('/products')
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0].name).to.equal('ASUS 717')
          done()
        })
    })
  })

  describe("GET /products/:id", function () {
    it('should return an object with status code 200', function (done) {
      chai
        .request(app)
        .get(`/products/${paramsId}`)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.status(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.name).to.equal('ASUS 717')
          done()
        })
    })

    it('should return an error message "data not found"', function (done) {
      chai
        .request(app)
        .get(`/products/1`)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.status(500)
          done()
        })
    })
  })

  describe("GET /products/search?q=name", function () {
    it('should return an fetch success', function (done) {
      chai
        .request(app)
        .get(`/products/search?q=ASUS`)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0].name).to.equal("ASUS 717")
          done()
        })
    })

    it('should return not found', function (done) {
      chai
        .request(app)
        .get(`/products/search?q=randomnname`)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

  describe("PUT /products/:id", function () {
    it('should return an update success', function (done) {
      let productUpdate = {
        price: 9000000
      }

      chai
        .request(app)
        .put(`/products/${paramsId}`)
        .send(productUpdate)
        .set('token', tokenAdmin)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data._id).to.equal(paramsId)
          expect(res.body.data.price).to.equal(9000000)
          done()
        })
    })

    it('should return an unauthorized access', function (done) {
      let productUpdate = {
        price: 900
      }

      chai
        .request(app)
        .put(`/products/${paramsId}`)
        .send(productUpdate)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })

  })

  describe("DELETE /products/:id", function () {
    it('should return delete success', function (done) {
      chai
        .request(app)
        .delete(`/products/${paramsId}`)
        .set('token', tokenAdmin)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body.data._id).to.equal(paramsId)
          expect(res.body.data.price).to.equal(9000000)
          done()
        })
    })

    it('should return unauthorized access', function (done) {
      chai
        .request(app)
        .delete(`/products/${paramsId}`)
        .set('token', tokenUser)
        .end(function (err, res) {
          expect(res).to.have.status(401)
          done()
        })
    })
  })

  after(function (done) {
    clearProduct(done)
  })

  after(function (done) {
    clearUser(done)
  })

  after(function(done){
    clearCart(done)
  })

})





