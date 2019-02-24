const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearUser = require('../helpers/clearUser')
const clearCart = require('../helpers/clearCart')

chai.use(chaiHttp)

describe('User tests', function () {

  before(function (done) {
    clearUser(done)
  })

  describe('POST /users/register', function () {
    it('should retur registration success', function (done) {
      var newUser = {
        username: "user1",
        email: "user1@mail.com",
        password: "123456"
      }

      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body.data).to.have.property('_id')
          expect(res.body.token).to.be.a('string')
          expect(res.body.cart).to.have.property('_id')
          expect(res.body.cart).to.have.property('userId')
          expect(res.body.data.username).to.equal(newUser.username)
          expect(res.body.data.email).to.equal(newUser.email)
          expect(res.body.data.password).to.not.equal(newUser.password)
          expect(res.body.data.role).to.equal('user')
          expect(res.body.data.source).to.equal('manual')
          done()
        })
    })

    it("should return email & username unique validation error", function (done) {
      var newUser = {
        username: "user1",
        email: "user1@mail.com",
        password: "123456"
      }

      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          expect(res.body.err.name).to.be.equal('ValidationError')
          done()
        })
    })

    it('should return username cant be empty', function (done) {
      var newUser = {
        username: '' ,
        email: "user2@mail.com",
        password: "123456"
      }

      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

    it('should return email cant be empty', function (done) {
      var newUser = {
        username: 'user2' ,
        email: "",
        password: "123456"
      }

      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

    it('should return password cant be empty', function (done) {
      var newUser = {
        username: 'user2' ,
        email: "user2@mail.com",
        password: ""
      }

      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          expect(res).to.have.status(400)
          done()
        })
    })

  })

  describe('POST /users/login', function () {
    it('should return an object with 200 status code', function (done) {
      var userLogin = {
        email: "user1@mail.com",
        password: "123456"
      }

      chai
        .request(app)
        .post('/users/login')
        .send(userLogin)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
          expect(res.body.message).to.equal('sign in success')
          done()
        })

    })

    it('should return an object with "email not registered" message ', function (done) {
      var userLogin = {
        email: "User2@mail.com",
        password: "987654321"
      }

      chai
        .request(app)
        .post('/users/login')
        .send(userLogin)
        .end(function (err, res) {
          expect(res.body.message).to.equal('email not registered')
          done()
        })
    })

    it('should return an object with "email/password not found" message ', function (done) {
      var userLogin = {
        email: "user1@mail.com",
        password: "987654321"
      }

      chai
        .request(app)
        .post('/users/login')
        .send(userLogin)
        .end(function (err, res) {
          expect(res.body.message).to.equal('email/password not found')
          done()
        })
    })
  })


  after(function (done) {
    clearUser(done)
  })

  after(function(done) {
    clearCart(done)
  })

})
