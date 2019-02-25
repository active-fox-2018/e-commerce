require('dotenv').config()

const jwt = require('jsonwebtoken')
const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai
const app = require('../app')
const Product = require('../models/product')
const Admin = require('../models/admin')
const User = require('../models/user')

chai.use(chaiHttp)

let user = {fullname: "Theresia Coanata" ,email: "there@mail.com", password: "thereeeeeee"}
let product = {
    name: "White T-shirt",
    price: 200000,
    stock: 10
}
let tokenUser = null
let productId = null
let transactionId = null


before(function(done) {
    Product
        .deleteMany({})
        .then(() => {
            done()
        })
        .catch(() => {
            done()
        })
        
})

before(function(done) {
    User
        .deleteMany({})
        .then(() => {
            done()
        })
        .catch(() => {
            done()
        })
})


before(function(done) {
    Product
        .create(product)
        .then((product) => {
            productId = product._id
            done()
        })
        .catch(() => {
            done()
        })
})


before(function(done) {
    User
        .create(user)
        .then((user) => {
            done()
        })
        .catch(() => {
            done()
        })
})

before(function(done) {
    chai
        .request(app)
        .post('/users/login')
        .send({email: "there@mail.com", password: "thereeeeeee"})
        .end(function(err, res) {
            tokenUser = res.body.token

            done()
        })
})
describe("transaction", function() {
    
    it("should successfully added a product to cart", function(done) {
        chai
            .request(app)
            .patch('/users')
            .set('token', tokenUser)
            .send({productId: productId})
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('status')
                expect(res.body.status).to.equal("You have successfully added a product to your cart")
                done()
            })
    })

    it("should successfully get cart", function(done) {
        chai
            .request(app)
            .get('/users')
            .set('token', tokenUser)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('cart')
                done()
            })

    })

    it("should successfully proceed the transaction", function(done) {

        chai
            .request(app)
            .post('/transactions')
            .send([productId])
            .set('token', tokenUser)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.have.property("status")
                expect(res.body.status).to.equal("Thank You, your transaction is now being processed")
                expect(res.body).to.have.property("transaction")
                transactionId = res.body.transaction._id
                done()
            })
    })
    
    it("should show all transactions", function(done) {
        chai
            .request(app)
            .get('/transactions/buyer')
            .set('token', tokenUser)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("transactions")
                done()
            })
    })
    
    it("should be able to change the transaction status to Received", function(done) {
        chai
            .request(app)
            .patch(`/transactions/buyer/${transactionId}`)
            .set('token', tokenUser)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property("status")
                expect(res.body.status).to.equal("Your transaction status has been updated")
                done()
            })
            
    })
    after(function(done) {
        Product
            .deleteMany({})
            .then(() => {
                done()
            })
            .catch(() => {
                done()
            })
    })

})





