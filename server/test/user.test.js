const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

let userToken = null


let newUser = {fullname: "Celyn Susanto", email: "celyn.vy@gmail.com", password: "Celyn6996"}

describe('User', function() {

    describe("Register user", function() {

        describe('Success', function() {
            it('should successfully create a new user', function(done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body.user).to.have.property('fullname')
                        expect(res.body.user).to.have.property('email')
                        expect(res.body.user.fullname).to.be.a('string')
                        expect(res.body.user.email).to.be.a('string')
                        expect(res.body.user.fullname).to.equal(newUser.fullname)
                        expect(res.body.user.email).to.equal(newUser.email)
                        expect(res.body.status).to.equal("You have successfully registered a new account")
                        done()
                    })
            })
        })
        
        describe("Error", function() {
            let newUserFailed1 = {fullname: "", email: "celyn@gmail.com", password: "Celyn6996"}
    
            it('should not be able to create a new user - fullname empty', function(done) {
                chai   
                    .request(app)
                    .post('/users/register')
                    .send(newUserFailed1)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Please fill up your Fullname")
                        done()
                    })
            })
    
            let newUserFailed2 = {fullname: "Celyn Susanto", email: "", password: "Celyn6996"}
            it('should not be able to create a new user - emaiil empty', function(done) {
                chai   
                    .request(app)
                    .post('/users/register')
                    .send(newUserFailed2)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Please fill up your Email")
                        done()
                    })
            })
    
            let newUserFailed3 = {fullname: "Celyn Susanto", email: "celyn@gmail.com", password: ""}
            it('should not be able to create a new user - password empty', function(done) {
                chai   
                    .request(app)
                    .post('/users/register')
                    .send(newUserFailed3)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Please fill up your Password")
                        done()
                    })
            })
    
    
            let newUserFailed4 = {fullname: "Celyn Susanto", email: "celyngmail.com", password: "Celyn6996"}
            it('should not be able to create a new user - email invalid', function(done) {
                chai   
                    .request(app)
                    .post('/users/register')
                    .send(newUserFailed4)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Please fill a valid Email address")
                        done()
                    })
            })
    
            let newUserFailed5 = {fullname: "Celyn Susanto", email: "celyn@gmail.com", password: "Celyn"}
            it('should not be able to create a new user - password too short', function(done) {
                chai   
                    .request(app)
                    .post('/users/register')
                    .send(newUserFailed5)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Password should be at least 6 characters")
                        done()
                    })
            })
    
            let newUserFailed6 = {fullname: "Celyn Susanto", email: "celyn.vy@gmail.com", password: "Celyn6996"}
            it('should not be able to create a new user - email not unique', function(done) {
                chai   
                    .request(app)
                    .post('/users/register')
                    .send(newUserFailed6)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Sorry, Email has been used")
                        done()
                    })
            })
        })

    })
   
    describe('Login user', function() {
    
        describe("Login Success", function() {
            it("should logged in successfully", function(done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({email: "celyn.vy@gmail.com", password: "Celyn6996"})
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body.status).to.equal("You are successfully logged in to your account")
                        expect(res.body).to.have.property("token")
                        expect(res.body.token).to.be.a("string")
                        userToken = res.body.token
                        done()
                    })
            })
        })
    
        describe("Login Failed", function() {
            let theUserFailed1 = {email: "celyn.vy@gmail.com", password: "Cely6996"}
            it("should not be able to login - wrong password", function(done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send(theUserFailed1)
                    .end(function(err, res) {
                        expect(err).to.be.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Sorry, wrong password")
                        done()
                    })
    
            })
    
            let theUserFailed2 = {email: "celynvy@gmail.com", password: "Celyn6996"}
            it('should not be able to login - email not registered', function(done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send(theUserFailed2)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.status).to.equal("Sorry, your email is not registered")
                        done()
                    })
                    
            })
        })
         
        
    })
        
})



