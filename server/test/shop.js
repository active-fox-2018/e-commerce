const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    models = require('../models')

chai.use(chaiHttp)

before(async function () {
    try {
        await models.User.deleteMany({})
        await models.Cart.deleteMany({})
        await models.Product.deleteMany({})
        await models.Transaction.deleteMany({})
        await models.User.create({
            name: 'user1',
            email: 'user1@example.com',
            password: 'user1',
            role: 'admin',
        })
        await models.User.create({
            name: 'user2',
            email: 'user2@example.com',
            password: 'user2',
        })
    }
    catch (err) {
        console.log(err)
    }
})
after(function (done) {
    done()
})

let user1token = ''
let user1id = ''
let user2token = ''
let user2id = ''

describe('get token', function () {
    it('user 1', function (done) {
        chai
            .request(app)
            .post('/api/users/login')
            .send({ email: 'user1@example.com', password: 'user1' })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                user1token = res.body.token
                user1id = res.body.userData._id
                done()
            })
    })

    it('user 2', function (done) {
        chai
            .request(app)
            .post('/api/users/login')
            .send({ email: 'user2@example.com', password: 'user2' })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                user2token = res.body.token
                user2id = res.body.userData._id
                done()
            })
    })
})

let product1id = ''

describe('product CRUD test', function () {
    it('creates a new product as admin', function (done) {
        chai
            .request(app)
            .post('/api/products')
            .set('token', user1token)
            .send({
                name: 'product1',
                description: 'product1desc',
                price: 1
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body.name).to.equal('product1')
                expect(res.body.description).to.equal('product1desc')
                expect(res.body.price).to.equal(1)
                expect(res.body).to.have.property('_id')
                product1id = res.body._id
                done()
            })
    })

    it('creates a new product as normal user', function (done) {
        chai
            .request(app)
            .post('/api/products')
            .set('token', user2token)
            .send({
                name: 'product2',
                description: 'product2desc',
                price: 2
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(401)
                done()
            })
    })

    it('read all products', function (done) {
        chai
            .request(app)
            .get('/api/products')
            .set('token', user2token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(1)
                expect(res.body[0]).to.have.property('_id')
                done()
            })
    })

    it('update a product', function (done) {
        chai
            .request(app)
            .put('/api/products/' + product1id)
            .set('token', user1token)
            .send({
                name: 'product1edit',
                description: 'product1descedit',
                price: 2
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                done()
            })
    })

    it('delete a product', function (done) {
        chai
            .request(app)
            .delete('/api/products/' + product1id)
            .set('token', user1token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('_id')
                done()
            })
    })

    it('recreates the product for another tests', function (done) {
        chai
            .request(app)
            .post('/api/products')
            .set('token', user1token)
            .send({
                name: 'product1',
                description: 'product1desc',
                price: 1
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body.name).to.equal('product1')
                expect(res.body.description).to.equal('product1desc')
                expect(res.body.price).to.equal(1)
                expect(res.body).to.have.property('_id')
                product1id = res.body._id
                done()
            })
    })
})

let cart1id = ''

describe('cart test', function () {
    it('add an item to the cart', function (done) {
        chai
            .request(app)
            .post('/api/carts')
            .set('token', user1token)
            .send({
                productId: product1id,
                amount: 1
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body.amount).to.equal(1)
                expect(res.body).to.have.property('_id')
                cart1id = res.body._id
                done()
            })
    })

    it('check the item', function (done) {
        chai
            .request(app)
            .get('/api/carts/' + cart1id)
            .set('token', user1token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.user.name).to.equal('user1')
                expect(res.body.product.name).to.equal('product1')
                expect(res.body.amount).to.equal(1)
                done()
            })
    })


    it("make sure other users can't see", function (done) {
        chai
            .request(app)
            .get('/api/carts/' + cart1id)
            .set('token', user2token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(401)
                done()
            })
    })

    it("delete the cart", function (done) {
        chai
            .request(app)
            .delete('/api/carts/' + cart1id)
            .set('token', user1token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('_id')
                done()
            })
    })

    it('recreates the cart for another tests', function (done) {
        chai
            .request(app)
            .post('/api/carts')
            .set('token', user1token)
            .send({
                productId: product1id,
                amount: 1
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body.amount).to.equal(1)
                expect(res.body).to.have.property('_id')
                cart1id = res.body._id
                done()
            })
    })
})

let transaction1id = ''

describe('checkout', function () {
    it('checkout', function (done) {
        chai
            .request(app)
            .post('/api/transactions/checkout')
            .set('token', user1token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('_id')
                transaction1id = res.body._id
                done()
            })
    })

    it('get transactions history', function (done) {
        chai
            .request(app)
            .get('/api/transactions')
            .set('token', user1token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(1)
                expect(res.body[0]).to.have.property('_id')
                expect(res.body[0]._id).to.equal(transaction1id)
                done()
            })
    })

    it("make sure other users can't see", function (done) {
        chai
            .request(app)
            .get('/api/transactions')
            .set('token', user2token)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.equal(0)
                done()
            })
    })
})
