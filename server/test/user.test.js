const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../app')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

let userId = null
let token = null

after(function(done) {
    clearUser(done)
})

before(function (done) {
    User.create({
        full_name: 'Admin',
        email: 'admin1@mail.com',
        password: '123123',
        role: 'admin'
    })
    .then(function(userCreated) {
        userId = userCreated._id
        token = generate(userCreated)
        done()
    })
    .catch(err => {
        console.log(err.message)
        done()
    })
})

describe('CRUD User', () => {
    describe('GET /users', () => {
    it('should return an array contained objects', (done) => {
        chai
            .request(app)
            .get('/users')
            .end(function (err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.users).to.be.an('array')
                for (let i = 0; i < res.body; i++) {
                    expect(res.body[i]).to.be.an('object')
                }
                done()
            })
        })

        it('should send back user detail in an object', (done) => {
            chai
                .request(app)
                .get(`/users/${userId}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should return a message "there is not user with that id"', (done) => {
            chai
                .request(app)
                .get(`/users/5c7292e87376c52ba6dddda7`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not found')
                    done()
                })
        })
    })

    describe('POST /register', () => {
        it('should send back a created user formed in an object', (done) => {
            const newUser = {
                full_name: 'Sultan Abu Bakar',
                email: 'sultanhasanaha@mail.com',
                password: '123123'
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.full_name).to.equal(newUser.full_name)
                    expect(res.body.email).to.equal(newUser.email)
                    expect(res.body.password).to.not.equal(newUser.password)
                    done()
                })
        })

        it('should send back a created user in an object with specific property', (done) => {
            const newUser = {
                full_name: 'Sultan Abu Bakar',
                email: 'sultanhasanaha@gmail.com',
                password: '123123'
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('full_name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    done()
                })
        })

        it('should send back a "Email is already been used"', (done) => {
            const newUser = {
                full_name: 'Sultan Abu Bakar',
                email: 'sultanhasanaha@mail.com',
                password: '123123'
            }
            chai
                .request(app)
                .post('/users')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User validation failed: email: Email is already been used')
                    done()
                })
            })
    })


    describe('PUT /user', () => {
        const editUser = {
            full_name: 'Sultan Abu Bakari'
        }
        it('should send back an object which has been updated', (done) => {
            chai
                .request(app)
                .put(`/users/${userId}`)
                .set('access_token', token)
                .send(editUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                    done()
                })
        })

        const editUserEmail = {
            email: 'sultain@mail.com'
        }
        it('should send back an object which has been updated', (done) => {
            chai
                .request(app)
                .put(`/users/${userId}`)
                .set('access_token', token)
                .send(editUserEmail)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                    done()
                })
        })

        const editUserPassword = {
            email: '123123'
        }
        it('should send back an object which has been updated', (done) => {
            chai
                .request(app)
                .put(`/users/${userId}`)
                .set('access_token', token)
                .send(editUserPassword)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .put(`/users/${userId}`)
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

        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            chai
                .request(app)
                .put(`/users/${userId}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })
    })

    describe('POST /login', () => {
        const input = {
            email: 'sultanhasanaha@mail.com',
            password: '123123'
        }

        it('should send back a token', function(done) {
            chai
                .request(app)
                .post('/users/login')
                .send(input)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    expect(res.body.token).to.be.a('string')
                    done()
                })
        })

        const wrongInput = {
            email: 'sultanhasanaha@mail.co',
            password: '123123'
        }

        it('should send "User not found" when there is no username found', function(done) {
            chai
                .request(app)
                .post('/users/login')
                .send(wrongInput)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.be.equal('User not found')
                    done()
                })
        })

        const wrongInputPass = {
            email: 'sultanhasanaha@mail.com',
            password: '1231234'
        }

        it('should send "Wrong password" when the password does not match', function(done) {
            chai
                .request(app)
                .post('/users/login')
                .send(wrongInputPass)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.be.equal('Wrong password')
                    done()
                })
        })
    })
})