const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    clearCart = require('../helpers/clearCart')

chai.use(chaiHttp)

const newUser = {
    name: 'cart',
    email: 'cart@mail.com',
    password: 'cart',
    role: 'admin'
}
let token = ''
let productId = ''
before(function(done) {
    clearCart(done)
    let data = {data: JSON.stringify(newUser)}
    it('should send an new user obj with 201 status code', function(done) {
        chai
            .request(app)
            .post('/register')
            .send(data)
            .end(function(err, res) {
                done()
            })
    })
    it('should send obj with 200 status code', function(done) {
      chai
          .request(app)
          .post('/login')
          .send({email: newUser.email, password: newUser.password})
          .end(function(err, res) {
              token = res.body.token
              done()
          })
    })
    it('should send obj with 201 status code', function(done) {
      let newProduct = {
          name: 'product',
          price: 1000,
          stock: 10
      }
      let data = {data: JSON.stringify(newProduct)}
      chai
          .request(app)
          .post('/products')
          .set('token', token)
          .send(data)
          .end(function(err, res) {
              productId = res.body._id
              done()
          })
    })
})

after(function(done) {
    clearCart(done)
})

describe('Cart Test', function() {
    describe('GET /carts', function() {
        it('should send object with 200 status code', function(done) {
            chai
                .request(app)
                .get('/carts')
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send object with 500 status code', function(done) {
          chai
              .request(app)
              .get('/carts')
              .set('token', 'token')
              .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  expect(res.body).to.be.an('object')
                  done()
              })
        })
    })

    describe('PUT /carts/addProducts', function() {
        it('should send obj with 200 status code', function(done) {
            let newProduct = {
                productId: productId,
                qty: 1
            }
            chai
                .request(app)
                .put(`/carts/addProducts`)
                .set('token', token)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send object with 500 status code', function(done) {
          let newProduct = {
            productId: productId,
            qty: 1
          }
          chai
              .request(app)
              .put('/carts/addProducts')
              .set('token', 'token')
              .send(newProduct)
              .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(500)
                  expect(res.body).to.be.an('object')
                  done()
              })
        })

    })

    describe('PUT /carts/reduceProducts', function() {
      it('should send obj with 200 status code', function(done) {
          let newProduct = {
              productId: productId
          }
          chai
              .request(app)
              .put(`/carts/reduceProducts`)
              .set('token', token)
              .send(newProduct)
              .end(function(err, res) {
                  expect(err).to.be.null
                  expect(res).to.have.status(200)
                  expect(res.body).to.be.an('object')
                  done()
              })
      })

      it('should send object with 500 status code', function(done) {
        let newProduct = {
          productId: productId,
          qty: 1
        }
        chai
            .request(app)
            .put('/carts/reduceProducts')
            .set('token', 'token')
            .send(newProduct)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(500)
                expect(res.body).to.be.an('object')
                done()
            })
      })

  })

  describe('PUT /carts/checkout', function() {
    it('should send obj with 201 status code', function(done) {
        let obj = {
            total: 123123
        }
        chai
            .request(app)
            .put(`/carts/checkout`)
            .set('token', token)
            .send(obj)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                done()
            })
    })

    it('should send object with 500 status code', function(done) {
      let obj = {
        total: 123123
      }
      chai
          .request(app)
          .put('/carts/checkout')
          .set('token', 'token')
          .send(obj)
          .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(500)
              expect(res.body).to.be.an('object')
              done()
          })
    })
  })

})