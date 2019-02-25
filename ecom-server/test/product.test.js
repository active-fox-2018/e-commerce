const Chai = require('chai')
const expect = Chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')


Chai.use(chaiHttp)

before(function (done) {
    Cart.remove({}, () => {
        User.remove({}, () => {
          Product.remove({}, () => {
            done()
          })
        })
      })
});

after(function (done) {
    Cart.remove({}, () => {
        User.remove({}, () => {
          Product.remove({}, () => {
            done()
          })
        })
      })
});

let accessToken = null
let accessTokenKedua = null

before(function(done){
    let testUser = {
        name: `Mat Dolar`,
        email: `test02@mail.com`,
        password: `1234`,
        role : 'admin'
    }
    User.create(testUser)
        .then((user) => {
            let objUser = {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
            accessToken = jwt.sign(objUser,process.env.JWT_SECRET)
            userId = String(objUser.id)
            done()
            
        })
})

before(function(done){
    let testUser = {
        name: `Jeng Kelin`,
        email: `test04@mail.com`,
        password: `1234`,
        role : 'user'
    }
    User.create(testUser)
        .then((user) => {
            let objUser = {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
            accessTokenKedua = jwt.sign(objUser,process.env.JWT_SECRET)
            userId = String(objUser.id)
            done()
            
        })
})

describe(`/products/ endpoint test with authentication authorization `, function () {

    describe(`/products/ endpoint with admin role, invalid input case`, function() {
        it(`POST /products/ with no name, should return 500 status code and message "name must be filled"`, function (done) {
            let newProduct = {
                name: ``,
                description: `harga nego`,
                price: 10000,
                image: `samsung.png`
            }
    
            Chai
                .request(app)
                .post('/products')
                .set('access_token', accessToken)
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include(`name must be filled`)
                    done()
                    paramsId = res.body._id
                })
        })

        it(`POST /products/ with no description, should return 500 status code and message "description must be filled"`, function (done) {
            let newProduct = {
                name: `Samsung z9`,
                description: ``,
                amount: 20,
                image: `samsung.png`
            }
    
            Chai
                .request(app)
                .post('/products')
                .set('access_token', accessToken)
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include(`description must be filled`)
                    done()
                    paramsId = res.body._id
                })
        })

        it(`POST /products/ with no price, should return 500 status code and message "price must be filled"`, function (done) {
            let newProduct = {
                name: `Samsung z9`,
                description: `harga dibanting`,
                price: '',
                image: `samsung.png`
            }
    
            Chai
                .request(app)
                .post('/products')
                .set('access_token', accessToken)
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.include(`price must be filled`)
                    done()
                    paramsId = res.body._id
                })
        })

    })

    let paramsId = null
    describe(`/products/ endpoint with admin role `, function(){
        it(`POST /products/ should send an object of inserted product with 201 status code`, function (done) {
            let newProduct = {
                name: `Handphone Samsung S9`,
                description: `harga nego`,
                amount: 20,
                image: `samsung.png`,
                price : 10000
            }
    
            Chai
                .request(app)
                .post('/products')
                .set('access_token', accessToken)
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('amount')
                    expect(res.body).to.have.property('image')
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.description).to.equal(newProduct.description)
                    expect(res.body.amount).to.equal(newProduct.amount)
                    expect(res.body.image).to.equal(newProduct.image)
                    expect(res.body.price).to.equal(newProduct.price)
                    done()
                    paramsId = res.body._id
                })
        })
    
        it(`PUT/products/:id (id = productId) should change all the object atribute with 200 status code`, function (done) {
            let editedProduct = {
                name: `Handphone LG PRO`,
                description: `harga fix`,
                price: 100000,
                image: `lg.png`,
                amount : 15
            }
            Chai
                .request(app)
                .put(`/products/${paramsId}`)
                .set('access_token', accessToken)
                .send(editedProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('amount')
                    expect(res.body).to.have.property('image')
                    expect(res.body.name).to.equal(editedProduct.name)
                    expect(res.body.description).to.equal(editedProduct.description)
                    expect(res.body.amount).to.equal(editedProduct.amount)
                    expect(res.body.image).to.equal(editedProduct.image)
                    expect(res.body.price).to.equal(editedProduct.price)
                    done()
                })
        })
    
        it(`PATCH /products/:id (id = productId) should change specific object atribute with 200 status code`, function (done) {
            let editSpecificProduct = {
                description: `harga nego pm 081566123456`,
            }
            Chai
                .request(app)
                .patch(`/products/${paramsId}`)
                .set('access_token', accessToken)
                .send(editSpecificProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('amount')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('price')
                    expect(res.body.description).to.equal(editSpecificProduct.description)
                    done()
                })
        })
    
        it(`DELETE /products/:id (id = productId) should delete a product`, function (done) {
            Chai
                .request(app)
                .delete(`/products/${paramsId}`)
                .set('access_token', accessToken)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body._id).to.equal(paramsId)
                    done()
                })
        })
    })

    describe('/products/ endpoint with user role ', function(){
        it(`POST /products/ should send status code 401 and message "user not authorized to view this page"`, function (done) {
            let newProduct = {
                name: `Handphone Samsung S9`,
                description: `harga nego sedikit`,
                price: 201111,
                image: `samsung.png`
            }
            Chai
                .request(app)
                .post('/products')
                .set('access_token', accessTokenKedua)
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not authorized to view this page')
                    paramsId = res.body._id
                    done()
                })
        })
    
        it(`PUT/products/:id (id = productId) should send status code 401 and message "user not authorized to view this page"`, function (done) {
            let editedProduct = {
                name: `Handphone LG PRO`,
                description: `harga fix`,
                price: 102222,
                image: `lg.png`
            }
            Chai
                .request(app)
                .put(`/products/${paramsId}`)
                .set('access_token', accessTokenKedua)
                .send(editedProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not authorized to view this page')
                    done()
                })
        })
    
        it(`PATCH /products/:id (id = productId) should send status code 401 and message "user not authorized to view this page"`, function (done) {
            let editSpecificProduct = {
                description: `harga nego pm 081566123456`,
            }
            Chai
                .request(app)
                .patch(`/products/${paramsId}`)
                .set('access_token', accessTokenKedua)
                .send(editSpecificProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not authorized to view this page')
                    done()
                })
        })
    
        it(`DELETE /products/:id (id = productId) should send status code 401 and message "user not authorized to view this page"`, function (done) {
            Chai
                .request(app)
                .delete(`/products/${paramsId}`)
                .set('access_token', accessTokenKedua)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not authorized to view this page')
                    done()
                })
        })
    })
    
})

describe(`/products/ endpoint test with no authentication `, function(){
    it(`GET /products/ should send an array of object product with 200 status code`, function (done) {
        Chai
            .request(app)
            .get('/products')
            .end(function (err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
    })
})
