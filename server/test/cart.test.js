const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../app')
const Product = require('../models/product')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

let token = null//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmM0MGU5YTcyMGUyZWRlNWQ4MWZjNSIsImZ1bGxfbmFtZSI6IlN1bHRhbiBBYnUgQmFrYXIiLCJlbWFpbCI6InN1bHRhbmhhc2FuYWhAbWFpbC5jb20iLCJpYXQiOjE1NTA1OTgzNzd9.EmszePftQzZUik8RTbUZqo6Y1vzScK2T2uYQgtMT53w'
let userId;
let userBeforeAllCreated;
let id;
let deletedId;

before(function (done) {
    clearUser(done)
})

before(function (done) {
    Product.create({
        name: 'Gelas',
        stock: 9,
        price: 11000,
        imageUrl: 'http://mahdihrs.world'
    })
        .then(newProd => {
            id = newProd._id
            deletedId = newProd._id
            done()
        })
        .catch(err => {
            done()
        })
})

before(function (done) {
    User.create({
        full_name: 'Admin 2',
        email: 'admin2@mail.com',
        password: '123123',
        role: 'admin'
    })
        .then(userCreated => {
            // userBeforeAllCreated = userCreated
            userId = userCreated._id
            token = generate(userCreated)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})


describe('Cart Test', () => {
    describe('Get User Cart', () => {
        // it('should send back the cart with many products in array of objects', (done) => {
        //     chai
        //         .request(app)
        //         .get('/cart')
        //         .set('access_token', token)
        //         .end(function (err, res) {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(200)
        //             expect(res).to.be.an('array')
        //             expect(res).to.be.json
        //             done()
        //         })
        // })
        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            chai
                .request(app)
                .get('/cart')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .get('/cart')
                .set('access_token', 'salahtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                    done()
                })
        })
    })

    describe('Add to cart and up the quantity', () => {
        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            chai
                .request(app)
                .put(`/cart/add/${id}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .put(`/cart/add/${id}`)
                .set('access_token', 'salahtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                    done()
                })
        })
    })

    describe('Remove product from cart and reduce the quantity', () => {
        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            chai
                .request(app)
                .put(`/cart/min/${id}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .put(`/cart/min/${id}`)
                .set('access_token', 'salahtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                    done()
                })
        })
    })

    describe('Remove all products from cart', () => {
        // it.only('should send a status 200 meaning that all products in cart has been deleted', (done) => {
        //     chai
        //         .request(app)
        //         .delete('/cart')
        //         .set('access_token', token)
        //         .end(function (err, res) {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(200)
        //             expect(res).to.be.an('object')
        //             expect(res.body.msg).to.equal('Success clear cart')
        //             done()
        //         })
        // })

        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            chai
                .request(app)
                .delete(`/cart`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .delete(`/cart`)
                .set('access_token', 'salahtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                    done()
                })
        })
    })

})