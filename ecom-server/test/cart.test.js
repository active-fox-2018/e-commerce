const Chai = require('chai')
const expect = Chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const { clearProduct, clearUser } = require('../helpers/clearData')
const { comparePass } = require('../helpers/password')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')

Chai.use(chaiHttp)

describe('/carts/ endpoint test', function () {
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
    let productId = null
    let productId2 = null



    describe('POST /carts/ , user adding product to cart ', function () {
        before(function (done) {
            let testUser = {
                name: `Mat Yen`,
                email: `test109@mail.com`,
                password: `1234`,
                role: 'user'
            }
            User.create(testUser)
                .then(user => {
                    let objUser = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                    Cart.create({ userId: objUser.id })
                    accessToken = jwt.sign(objUser, process.env.JWT_SECRET)
                    userId = String(objUser.id)
                    //terbentuk cart
                    let newProduct = {
                        name: `Handphone Samsung S9`,
                        description: `harga nego`,
                        amount: 20,
                        image: `samsung.png`,
                        price: 10000
                    }
                    return Product.create(newProduct)
                })
                .then(create1 => {
                    productId = create1._id
                    let newProduct2 = {
                        name: `Handphone LG S9`,
                        description: `harga nego`,
                        amount: 20,
                        image: `samsung.png`,
                        price: 10000
                    }
                    return Product.create(newProduct2)
                })
                .then(create2 => {
                    productId2 = create2._id
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done()
                })
        })

        it('add productId should return object cart with 200 status', function (done) {
            Chai
                .request(app)
                .post('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data.productId.length).to.equal(1)
                    done()
                })
        })

        it('add without authorization should return 401 statuscode and msg unauthorized access', function (done) {
            Chai
                .request(app)
                .post('/carts/')
                .send({ productId: productId })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('unauthorized user')
                    done()
                })
        })

        it('add productId should return object cart with productId length equal 2', function (done) {
            Chai
                .request(app)
                .post('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data.productId).to.be.an('array')
                    expect(res.body.data.productId.length).to.equal(2)
                    done()
                })
        })

        it('add productId2 should return object cart with productId length equal 3', function (done) {
            Chai
                .request(app)
                .post('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId2 })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data.productId).to.be.an('array')
                    expect(res.body.data.productId.length).to.equal(3)
                    done()
                })
        })


    })

    describe('PATCH /carts/ , user removing product from cart ', function () {
        

        it('removing product 2 should return object cart with productId length equal 2', function (done) {
            Chai
                .request(app)
                .patch('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId2 })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    console.log(res.body.data)
                    expect(res.body.data.productId).to.be.an('array')
                    expect(res.body.data.productId.length).to.equal(2)
                    done()
                })
        })

        it('removing product 2 without authorization should return 401 status code and msg unauthorized access', function (done) {
            Chai
                .request(app)
                .patch('/carts/')
                .send({ productId: productId2 })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('unauthorized user')
                    done()
                })
        })

        it('removing product 1 should return object cart with productId length equal 1', function (done) {
            Chai
                .request(app)
                .patch('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data.productId).to.be.an('array')
                    expect(res.body.data.productId.length).to.equal(1)
                    done()
                })
        })

        it('removing product 1 2nd time should return object cart with productId length equal 1', function (done) {
            Chai
                .request(app)
                .patch('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data.productId).to.be.an('array')
                    expect(res.body.data.productId.length).to.equal(0)
                    done()
                })
        })

        it('removing product 1 3rd time from empty cart should return msg "product not found"', function (done) {
            Chai
                .request(app)
                .patch('/carts/')
                .set('access_token', accessToken)
                .send({ productId: productId })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.equal('product not found')
                    done()
                })
        })


    })

})



