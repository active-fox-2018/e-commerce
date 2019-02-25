require('dotenv').config()

const jwt = require('jsonwebtoken')
const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai
const app = require('../app')
const Product = require('../models/product')
const Admin = require('../models/admin')

chai.use(chaiHttp)

let admin = {username: "celyn96", password: "Celyn6996"}
let tokenAdmin = null
let productId = null

describe('CRUD product', function() {
    tokenAdmin = jwt.sign({username: admin.username}, process.env.JWT_SECRET);
    before(function(done) {
        Product
            .deleteMany({})
            .then(function() {
                done()
            })
            .catch(() => {
                done()
            })
    })
    
    before(function(done) {
        Admin
            .deleteMany({})
            .then(function() {
                done()
            })
            .catch(() => {
                done()
            })
    })
    
    before(function(done) {
        Admin
            .create(admin)
            .then((admin) => {
                done()
            })
            .catch(() => {
                done()
            })
    })
    describe('Create', function() {
        
        describe('Create Success', function() {
            
            it('should create a product', function(done) {
                let product = {
                    name: "White T-shirt",
                    price: 200000,
                    stock: 10
                }

                chai
                    .request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send(product)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property("product")
                        expect(res.body).to.have.property("status")
                        expect(res.body.product).to.have.property("_id")
                        expect(res.body.product).to.have.property("name")
                        expect(res.body.product).to.have.property("price")
                        expect(res.body.product).to.have.property("stock")
                        expect(res.body.product).to.have.property('created_at')
                        expect(res.body.product.name).to.equal(product.name)
                        expect(res.body.product.price).to.equal(product.price)
                        expect(res.body.product.stock).to.equal(product.stock)
                        expect(res.body.status).to.equal("You have successfully added a product")
                        productId = res.body.product._id
                        done()
                    })
            })
        })

        describe("Create Failed", function() {

            let productFail1 = {
                name: "",
                price: 200000,
                stock: 10
            }

            it("should not be able to create a new product - name is empty", function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send(productFail1)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property("status")
                        expect(res.body.status).to.equal("Please fill up product's name")
                        done()
                    })
            })

            let productFail2 = {
                name: "White T-shirt",
                price: null,
                stock: 10
            }

            it("should not be able to create a new product - price is empty", function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send(productFail2)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property("status")
                        expect(res.body.status).to.equal("Please fill up product's price")
                        done()
                    })
            })

            let productFail3 = {
                name: "White T-shirt",
                price: 200000,
                stock: null
            }

            it("should not be able to create a new product - stock is empty", function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', tokenAdmin)
                    .send(productFail3)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property("status")
                        expect(res.body.status).to.equal("Please fill up product's stock")
                        done()
                    })
            })
        })

    })

    describe("Read", function() {
        describe("Read Succeed", function() {
            it("should successfully read products", function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        done()
                    })
            })
        })
    })

    let updateProduct = {name: "Blue T-shirt"}

    describe("Update", function() {
        describe("Update Succeed", function() {
            it("should successfully updated a product", function(done) {
                chai
                    .request(app)
                    .patch(`/products/${productId}`)
                    .send(updateProduct)
                    .set('token', tokenAdmin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('status')
                        expect(res.body).to.have.property('product')
                        expect(res.body.status).to.equal('You have successfully updated a product')
                        expect(res.body.product).to.have.property('_id')
                        expect(res.body.product).to.have.property('name')
                        expect(res.body.product).to.have.property('price')
                        expect(res.body.product).to.have.property('stock')
                        expect(res.body.product).to.have.property('created_at')
                        done()
                    })
            })
        })
    })

    describe("Delete", function() {
        describe("Delete Succeed" , function() {
            it("should successfully deleted a product", function(done) {
                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .set('token', tokenAdmin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property("status")
                        expect(res.body.status).to.equal("You have successfully deleted a product")
                        done()
                    })
            
            })
        })
    })
    after(function(done) {
        Product
            .deleteMany({})
            .then(function() {
                done()
            })
            .catch(() => {
                done()
            })
    })
    
    after(function(done) {
        Admin
            .deleteMany(admin)
            .then((admin) => {
                done()
            })
            .catch(() => {
                done()
            })
    })

})


