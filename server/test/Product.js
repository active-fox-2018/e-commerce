const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')

chai.use(chaiHttp)

var token = ''
var notAdmin = ''
var fakeToken = 'akdokmdk'
var wrongJwtSecret = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmFiNjJmNDAxYzIzMWM5MDZlYTcwYyJ9.P6gOsFof3relhVzdFy_hxqSi_9s0rguAFRAB56uK968`
var notMongooseId = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmFiNjJmNDAxYzIzMWM5MDZlYWMifQ.mAac0-2oCwqiW8pBHHXpYSEm9Ug52gNk8x5YP-JlFPM`
var productId = ''

describe('PRODUCT', () => {

    before( function (done) {
        let newUser = {
            name: 'Admin',
            email: 'admin@mail.com',
            password: 'admin',
            address: 'Bulan',
            role: 'admin',
            phone: '081238493'
        }
        chai.request(app)
            .post('/users')
            .send(newUser)
            .end( (err, res) => {
                token = res.body.token
                let notAdmin = {
                    name: 'user',
                    email: 'user@mail.com',
                    password: 'user1',
                    address: 'Bulan',
                    phone: '0812384939'
                }
                chai.request(app)
                    .post('/users')
                    .send(notAdmin)
                    .end( (err, res) => {
                        notAdmin = res.body.token
                        done()
                    })
            })
    })

    after( function (done) {
        User.deleteOne({ email: `admin@mail.com`})
            .then(data => {
                User.deleteOne({ email: `user@mail.com`})
                    .then(data => {
                        done()
                    })
            })
    })

    describe('Create', () => {
        it(`should create a new product`, function (done) {
            let product = {
                name: 'test',
                price: 1000
            }
            chai.request(app)
                .post('/products')
                .set({ token })
                .send(product)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('_id')
                    productId = res.body._id
                    expect(res.body.name).to.equal(product.name)
                    done()
                })
        })

        it('should return name and price must be filled', function (done) {
            let product = {
                name: 'test',
                price: 1000
            }
            chai.request(app)
                .post('/products')
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Name and price must be filled`)
                    done()
                })
        })

        it('should return unauthorized', function (done) {
            let product = {
                name: 'test',
                price: 1000
            }
            chai.request(app)
                .post('/products')
                .set({ token: notAdmin })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Please login first`)
                    done()
                })
        })

        it('should return price must be a number', function (done) {
            let product = {
                name: 'test',
                price: 'aa'
            }
            chai.request(app)
                .post('/products')
                .set({ token })
                .send(product)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Price must be number`)
                    done()
                })
        })

        it('should return minimal quantity is 1', function (done) {
            let product = {
                name: 'test',
                price: 1000,
                qty: 0
            }
            chai.request(app)
                .post('/products')
                .set({ token })
                .send(product)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Minimal quantity is 1`)
                    done()
                })
        })


    })

    describe('Update', function (done) {

    })

    describe(`Delete`, () => {
        it(`should return deleted products`, function (done) {
            chai.request(app)
                .delete(`/products/${productId}`)
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })

        it(`should return product not found`, function (done) {
            chai.request(app)
                .delete(`/products/${productId}`)
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
        })
    })
})
