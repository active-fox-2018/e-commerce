const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { clearProduct, clearUser } = require('../helpers/clear')
const User = require('../models/user')
const Cart = require('../models/cart')
const { tokenGenerator } = require('../helpers/jwt')

chai.use(chaiHttp)

let productId = null
let tokenAdmin = null
let tokenUser = null

after( function(done) {
  clearUser(done)
})

before( function(done) {
  let input = {
    name : 'admin',
    email : 'admin@mail.com',
    password : 'cancan',
    role : 'admin'
  }
  User.create(input)
    .then( function(user) {
      tokenAdmin = tokenGenerator(user._id, user.name, user.email)
      done()
    })
    .catch( function(err) {
      console.log(err)
      done()
    })
})

before( function(done) {
  let input = {
    name : 'user',
    email : 'user@mail.com',
    password : 'cancan',
    role : 'user'
  }

  User.create(input)
    .then( function(user) {
      tokenUser = tokenGenerator(user._id, user.name, user.email)
      done()
    })
    .catch( function(err) {
      console.log(err)
      done()
    })
})

after( function(done) {
  clearProduct(done)
})

describe('PRODUCT TESTS', function() {

  describe('POST /products', function() {

    it('should send message you have to be login first', function(done) {

      let input = {
        title : 'product-test',
        description : 'product-description-but-more-long',
        image : 'some-image',
        stock : 3
      }
  
      chai
        .request(app)
        .post('/products')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal(`you have to be login first`)
          done()
        })
    })

    it('should created new product successfully', function(done) {

      let input = {
        title : 'product-test',
        description : 'product-description-but-more-long',
        image : 'some-image',
        stock : 3
      }

      // console.log(tokenAdmin, '=============')
      chai
        .request(app)
        .post('/products')
        .send(input)
        .set('token', tokenAdmin)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201);
          expect(res.body._id).to.be.a('string')
          // expect(res.body).to.have.property('message')
          productId = res.body._id
          done()
        })
    })

    it('should send message authorized access only', function(done) {

      let input = {
        title : 'product-test',
        description : 'product-description-but-more-long',
        image : 'some-image',
        stock : 3
      }

      chai
        .request(app)
        .post('/products')
        .send(input)
        .set('token', tokenUser)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('authorized access only')
          done()
        })
    })

    it('should send message Product Validation', function(done) {

      let input = {
        title : 'product-test',
        description : 'product-desc',
        image : 'some-image',
        stock : 2
      }
    
      chai
        .request(app)
        .post('/products')
        .send(input)
        .set('token', tokenAdmin)
        .end( function(err, res) {
          expect(err).to.be.null
          // console.log(res.body.message)
          expect(res.body.err).to.equal('Product validation failed: description: minimum length of description is 20 character')
          done()
        })
    })

    it('should send message Product Validation', function(done) {

      let input = {
        title : 'product-test',
        description : 'product-description-more-edition',
        image : 'some-image',
        stock : 'text'
      }
    
      chai
        .request(app)
        .post('/products')
        .send(input)
        .set('token', tokenAdmin)
        .end( function(err, res) {
          expect(err).to.be.null
          // console.log('=========================+==========',res.body)
          expect(res.body.err).to.equal(`Product validation failed: stock: Cast to Number failed for value "text" at path "stock"`)
          done()
        })
    })
  })

  describe('GET /products', function() {
    it('should send all products', function(done) {
      chai
        .request(app)
        .get('/products')
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.a('array')
          done()
        })
    })

    it('should send one products', function(done) {
      chai
        .request(app)
        .get(`/products/${productId}`)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.a('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('product found!')
          done()
        })
    })

    it('should send product not found', function(done) {
      chai
        .request(app)
        .get('/products/5c6f41987a5d1c1912efeabf')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('product not found')
          expect(res.body.data).to.equal(null)
          done()
        })
    })
  }) // tambahin getOne product 


  describe('UPDATE /products', function() {
    it('should update one products successfully', function(done) {

      let input = {
        title : 'new-product-name'
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .set('token', tokenAdmin)
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })

    it('should send message Product Validation', function(done) {

      let input = {
        title : '...'
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .set('token', tokenAdmin)
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.err).to.equal(`Validation failed: title: minimum length of title is 6 character`)
          // console.log(res.body)
          done()
        })
    })
  }) // tambah error validasi lain

  describe('DELETE /products', function() {
    it('should delete one products', function(done) {

      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set('token', tokenAdmin)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })

    it('should send message authorized access only', function(done) {

      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set('token', tokenUser)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('authorized access only')
          done()
        })
    })
  })
})

