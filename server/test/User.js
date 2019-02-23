const app = require('../app')
const User = require('../models/User')

const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect

chai.use(chaiHttp)

describe('Customer Authentication', function() {
    describe('Failed Register', function() {
        it('Should return 500 if user not input name', function(done) {
            let newUser = {
                email: 'jan@mail.com',
                password: '123',
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
        it('Should return 500 if user not input email', function(done) {
            let newUser = {
                name: 'jan',
                password: '123',
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
        it('Should return 500 if user not input wrong email format', function(done) {
            let newUser = {
                name: 'jan',
                email: 'janmailcom',
                password: '123',
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
        it('Should return 500 if user not input non unique email', function(done) {
            let newUser = {
                name: 'jan',
                email: 'jan@mail.com',
                password: '123',
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
        it('Should return 500 if user not input password', function(done) {
            let newUser = {
                name: 'jan',
                email: "jan@mail.com",
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
        it('Should return 500 if user not input password less than required length', function(done) {
            let newUser = {
                name: 'jan',
                email: 'jan@mail.com',
                password: '123',
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
        it('Should return 500 if user not input address', function(done) {
            let newUser = {
                name: 'jan',
                email: "jan@mail.com",
                password: '123'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })

    describe('Failed Login', function() {
        it('Should return 400 if user not input email address', function(done) {
            let loginData = {
                password: '12345'
            }

            chai
                .request(app)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.have.string('Please fill in all the form')
                    done()
                })
        })
        it('Should return 400 if user not input password', function(done) {
            let loginData = {
                email: 'jan@mail.com',
            }

            chai
                .request(app)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.have.string('Please fill in all the form')
                    done()
                })
        })
        it('Should return 400 if user input wrong email address', function(done) {
            let loginData = {
                email: 'jan123@mail.com',
                password: '12345'
            }

            chai
                .request(app)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    console.log(err)
                    console.log(res.body)
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.have.string('Email/password is wrong!')
                    done()
                })
        })
        it('Should return 400 if user input wrong password', function(done) {
            let loginData = {
                email: 'jan123@mail.com',
                password: '12312345'
            }

            chai
                .request(app)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(400)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.have.string('Email/password is wrong!')
                    done()
                })
        })
        it('Should return 400 if user input wrong email format', function(done) {
            let loginData = {
                email: 'jan123mailcom',
                password: '12345'
            }

            chai
                .request(app)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(400)
                    // expect(res.body).to.be.a('object')
                    // expect(res.body).to.have.property('msg')
                    // expect(res.body.msg).to.have.string('Email format is wrong!')
                    done()
                })
        })
        it('Should return 400 if user input password less than required length', function(done) {
            let loginData = {
                email: 'jan123@mail.com',
                password: '145'
            }

            chai
                .request(app)
                .post('/login')
                .send(loginData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(400)
                    // expect(res.body).to.be.a('object')
                    // expect(res.body).to.have.property('msg')
                    // expect(res.body.msg).to.have.string('Email format is wrong!')
                    done()
                })
        })
        
    })

    describe('Success Authentication', function() {
        after(function(done) {
            User
                .deleteMany({})
                .then(() => {
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })

        it('Should create new user', function(done) {
            let newUser = {
                name: 'jan',
                email: 'jan@mail.com',
                password: '12345678',
                address: 'jakarta'
            }
    
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body.name).to.equals(newUser.name)
                    done()
                })
        })
    
        it('should return token when user successfully login', function(done) {
            let loginInput = {
                email: 'jan@mail.com',
                password: '123'
            }
    
            chai
                .request(app)
                .post('/login')
                .send(loginInput)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    done()
                })
        })
    })
})