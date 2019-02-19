const chai = require('chai'),
  chaiHttp = require('chai-http'),
  {expect} = chai,
  app = require('../app'),
  User = require('../models/user'),
  Cart = require('../models/cart'),
  Item = require('../models/item'),
  Transaction = require('../models/transaction')

chai.use(chaiHttp)

before(function(done) {
  User.deleteMany({})
  .then(function() {
    return Cart.deleteMany({})
  })
  .then(function() {
    return Item.deleteMany({})
  })
  .then(function() {
    return Transaction.deleteMany({})
  })
  .then(data => {
    
  })
  this.timeout(500)
  setTimeout(done, 300)
})

let token = ''
let idItem = ''
let idUser = ''
let cartId = ''

// describe('CRUD Items', function () {
  it('should create an new items and get response 201', function (done) {
    const newItem = {
      name: 'baju',
      image: 'baju.jpg',
      price: 1000,
      stock: 10
    }
    chai
      .request(app)
      .post('/items')
      .send(newItem)
      .end(function (err, res) {
        idItem = res.body._id
        expect(err).to.be.null
        expect(res).to.have.status(201)
        done()
      })
      
      // this.timeout(500)
      // setTimeout(done, 300)
  })

  it('should send an array of items and get response 200', function (done) {
    chai
      .request(app)
      .get('/items')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  // it('should send updated and get respon 200', function (done) {
  //   const updatedItem = {
  //     name: 'baju',
  //     image: 'baju.jpeg',
  //     price: 1000,
  //     stock: 10
  //   }
  //   chai
  //     .request(app)
  //     .put(`/items/${idItem}`)
  //     .send(updatedItem)
  //     .end(function (err, res) {
  //       expect(err).to.be.null
  //       expect(res).to.have.status(200)
  //     })
  //   done()
  // })
// })

// describe('User register and login', function () {
  it('should get response 201 and create a new User with ', function (done) {

    let newUser = {
      name: 'ulfa',
      email: 'ulfaa@mail.com',
      password: 'abcdefghij'
    }
    chai
      .request(app)
      .post('/register')
      .send(newUser)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        idUser = res.body.user._id
        console.log(res.body)
        done()
      })
  })

  it('should get response 200 and get token from login ', function (done) {
    let userLogin = {
      email: 'ulfaa@mail.com',
      password: 'abcdefghij'
    }
    chai
      .request(app)
      .post('/login')
      .send(userLogin)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        token = res.body.token
        done()
      })
  })



// // describe('get item', function() {
  it('should get respond 200 : and sucsses add to cart', function(done) {
    let cart = {
     item : idItem,
     quantity : 2
    }
    chai
      .request(app)
      .post('/addToCart')
      .send(cart)
      .set('token', token)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        done()
      })
  })
// })

it('checkout a cart and return new transaction and get a new empty cart', function(done) {
  let getCheckOut = {
    CheckOut : true
  }
  chai
    .request(app)
    .patch(`/checkout`)
    .send(getCheckOut)
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(201)
      done()
    })
}) 

it('it should remove cart because the authentic user removed it', function(done) {
  chai  
    .request(app)
    .patch('/removeCart')
    .set('token', token)
    .end(function(err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(201)
      done()
    })
})

it('should delete an item and get respon 200', function (done) {
  chai
    .request(app)
    .delete(`/items/${idItem}`)
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      done()
    })

})


