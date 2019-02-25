const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai
const app = require('../app')
const Admin = require('../models/admin')

chai.use(chaiHttp)

let admin = {username: "celyn", password: "celyn6996"}
let tokenAdmin = null


describe("Admin", function() {
    
    before(function(done) {
        Admin
            .deleteMany({})
            .then(() => {
                done()
            })
            .catch(() => {
                done()
            })
    })
    describe("Register Admin", function() {
        it("should successfully registerd in an admin account", function(done) {
            chai
                .request(app)
                .post('/admin/register')
                .send(admin)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property("admin")
                    expect(res.body.admin).to.have.property("username")
                    expect(res.body.admin).to.have.property("password")
                    done()
                })
        })

    })

    describe("Login Admin", function() {
        describe("Login Succeed", function() {
            it("should successfully logged in an admin account", function(done) {
                chai
                    .request(app)
                    .post('/admin/login')
                    .send(admin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property("status")
                        expect(res.body).to.have.property('token')
                        expect(res.body.status).to.equal("You have successfully logged in as an Admin")
                        tokenAdmin = res.body.token
                        done()
                    })
            it("should successfully get transaction history", function(done) {
                chai
                    .request(app)
                    .get('/transactions')
                    .set('token', tokenAdmin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('transactions')
                        done()
                    })
            })
            })
        })
    
    
    
        describe("Login failed", function(done) {
            let adminFailed1 = {username: "adm", password: "celyn6996"}
    
            it("should not be able to login - wrong username", function(done) {
                chai
                    .request(app)
                    .post('/admin/login')
                    .send(adminFailed1)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property("status")
                        expect(res.body.status).to.equal("Sorry, Username is not registered")
                        done()
                    })
            })
    
            let adminFailed2 = {username: "celyn", password: "aaa"}
            it("should not be able to login - wrong password", function(done) {
                chai
                    .request(app)
                    .post('/admin/login')
                    .send(adminFailed2)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).be.have.status(400)
                        expect(res.body).to.have.property("status")
                        expect(res.body.status).to.equal("Sorry, wrong password")
                        done()
    
                    })
                    
            })
            
        })
        
    })
    
    after(function(done) {
        Admin
            .deleteMany({})
            .then(() => {
                done()
            })
            .catch(() => {
                done()
            })
    })
})


