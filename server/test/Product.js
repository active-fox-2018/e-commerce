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
    //entah kenapa not adminya g dapet??
    beforeEach( function (done) {
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

    afterEach( function (done) {
        User.deleteMany()
            .then(data => {
                done()
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
            console.log(notAdmin)
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
        //1
        it('should return You are not authorized', function (done) {
            console.log(notAdmin)
            console.log('===================')
            chai.request(app)
                .put(`/products/${productId}`)
                .send({
                    name: 'ubah'
                })
                .set({ token: notAdmin })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
            
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please login first')
                    done()
                })
        })

        //2
        it('should return wrong product id', function (done) {
            let id ='ass'
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
            
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product id is not valid')
                    done()
                })
        })

        //3 
        it('should return product not found', function (done) {
            let id = `5c457e610444391c8b4359bd`
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
        })

        //4 
        it('should return edited product', function (done) {
            let id = productId
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })

        //5
        it('should return edited price must be number', function (done) {
            let id = productId
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah',
                    price: '22d'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
            
                    expect(res.body).to.have.property('msg')

                    expect(res.body.msg).to.equal('Price must be number')
                    done()
                })
        })
    })


    it('should return one product', function (done) {
        chai.request(app)
        .get(`/products/${productId}`)
        .end( (err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
        })
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

    it('should return all product', function (done) {
        chai.request(app)
            .get(`/products/`)
            .end( (err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
    })
})
