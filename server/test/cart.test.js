const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const { clearUser, clearProduct, clearCart } = require('../helpers/clear')
const { tokenGenerator } = require('../helpers/jwt')

chai.use(chaiHttp)

let tokenUser = null
let userId = null
let firstProductId = null
let secondProductId = null
// let tokenAdmin = null

before( function(done) {
  clearCart(done)
})

after( function(done) {
  clearUser(done)
})

before(function(done) {

  let input = {
    name : 'user',
    email : 'user@email.com',
    password : 'cancan',
  }
    User.create(input)
    .then( function(user) {
      userId = user._id
      tokenUser = tokenGenerator(user._id, user.name, user.email)
      return Cart.create({ userId : userId, products :[] })
    })
    .then(function(cart) {
      done()
    })
    .catch( function(err) {
      console.log(err)
      done()
    })
})

before(function(done) {
  let input = {
    title: 'nama barang',
    description: 'nama barang harus panjang sampai dua puluh',
    image: 'kosong.jpg',
    stock: 200,
    price: 1000000,
  }
  Product.create(input)
    .then(function(newProduct) {
      firstProductId = newProduct._id
      done()
    })
    .catch(function(err) {
      console.log(err)
      done()
    })
})

before(function(done) {
  let input = {
    title: 'nama barang 2',
    description: 'nama barang harus panjang sampai dua puluh',
    image: 'kosong.jpg',
    stock: 0,
    price: 100000,
  }
  Product.create(input)
    .then(function(newProduct) {
      secondProductId = newProduct._id
      done()
    })
    .catch(function(err) {
      console.log(err)
      done()
    })  
})



describe('CART TEST', function() {
  
  describe('GET /carts', function() {
    
    it('should be send you have to be login first to check your cart', function(done) {
      chai
        .request(app)
        .get(`/carts`)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal(`you have to be login first`)
          done()
        })
    })

    it('should be get cart successfully', function(done) {
      // console.log(cartId, userId, tokenUser, '====')
      chai
        .request(app)
        .get('/carts')
        .set('token', tokenUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('cart found')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })
  })

  describe('PUT/carts/products', function() {
  
    it('should be send you have to be login first', function(done) {

      chai
        .request(app)
        .put(`/carts/products/${firstProductId}`)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal(`you have to be login first`)
          done()
        })
    })

    it('should be send added to cart successfully', function(done) {

      chai
        .request(app)
        .put(`/carts/products/${firstProductId}`)
        .set('token', tokenUser)
        .end(function(err, res) {
          // console.log(res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('added to cart successfully')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.totalPrice).is.not.equal(0)
          done()
        })
    })

    it('should be send product is out of stock', function(done) {

      chai
        .request(app)
        .put(`/carts/products/${secondProductId}`)
        .set('token', tokenUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('out of stock')
          done()
        })
    })

  })

  describe('DELETE /carts/products', function() {
    it('should be send product is successfully removed', function(done) {

      chai
        .request(app)
        .delete(`/carts/products/${firstProductId}`)
        .set('token', tokenUser)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('removed product cart successfully')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })

    it('should be send added to cart successfully', function(done) {
      chai
        .request(app)
        .put(`/carts/products/${firstProductId}`)
        .set('token', tokenUser)
        .end(function(err, res) {
          // console.log(res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('added to cart successfully')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.totalPrice).is.not.equal(0)
          done()
        })
    })

    it('should be send product is not on your cart', function(done) {

      chai
        .request(app)
        .delete(`/carts/products/${secondProductId}`)
        .set('token', tokenUser)
        .end(function(err, res) {
          // console.log(res.body)
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('product is not on your cart')
          done()
        })
    })
    
    it('should be send your cart is empty now', function(done) {
  
      chai
        .request(app)
        .delete('/carts/products')
        .set('token', tokenUser)
        .end(function(err, res) {
          // console.log(res.body.data)
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('your cart is empty now')
          done()
        })
    })
  })

})