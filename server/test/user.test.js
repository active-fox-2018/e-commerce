const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    clearUser = require('../helpers/clearUser')

chai.use(chaiHttp)

before(function(done) {
    clearUser(done)
})

after(function(done) {
    clearUser(done)
})

let token = ''
describe("User Tests", function() {
    describe('POST /register', function() {
        it('should send an new user obj with 201 status code', function(done) {
            const newUser = {
                name: 'fauzan',
                email: 'fauzan@mail.com',
                password: 'fauzan',
                role: 'admin'
            }
            let data = { data: JSON.stringify(newUser) }
            chai
                .request(app)
                .post('/register')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body).to.have.property('role')
                    expect(res.body.name).to.equal(newUser.name)
                    expect(res.body.email).to.equal(newUser.email)
                    expect(res.body.password).to.not.equal(newUser.password)
                    expect(res.body.role).to.equal(newUser.role)
                    done()
                })
        })

        it('should send an obj with 400 status code(name required)', function(done) {
            const newUser = {
                name: '',
                email: 'fauzan@mail.com',
                password: 'fauzan',
                role: 'admin'
            }
            let data = { data: JSON.stringify(newUser) }
            chai
                .request(app)
                .post('/register')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('err')
                    expect(res.body.err).to.have.property('name')
                    expect(res.body.err.name).to.have.property('message')
                    expect(res.body.err.name.message).to.equal('required user name')
                    done()
                })
        })

        it('should send an obj with 400 status code(email required)', function(done) {
            const newUser = {
                name: 'fauzan',
                email: '',
                password: 'fauzan',
                role: 'admin'
            }
            let data = { data: JSON.stringify(newUser) }
            chai
                .request(app)
                .post('/register')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('err')
                    expect(res.body.err).to.have.property('email')
                    expect(res.body.err.email).to.have.property('message')
                    expect(res.body.err.email.message).to.equal('required user email')
                    done()
                })
        })

        it('should send an obj with 400 status code(password required)', function(done) {
            const newUser = {
                name: 'fauzan',
                email: 'fauzan@mail.com',
                password: '',
                role: 'admin'
            }
            let data = { data: JSON.stringify(newUser) }
            chai
                .request(app)
                .post('/register')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('err')
                    expect(res.body.err).to.have.property('password')
                    expect(res.body.err.password).to.have.property('message')
                    expect(res.body.err.password.message).to.equal('required user password')
                    done()
                })
        })

        it('should send an obj with 400 status code(invalid email format)', function(done) {
            const newUser = {
                name: 'fauzan',
                email: 'fauzanmail.com',
                password: 'fauzan',
                role: 'admin'
            }
            let data = { data: JSON.stringify(newUser) }
            chai
                .request(app)
                .post('/register')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('err')
                    expect(res.body.err).to.have.property('email')
                    expect(res.body.err.email).to.have.property('message')
                    expect(res.body.err.email.message).to.equal('invalid email format')
                    done()
                })
        })

        it('should send an obj with 400 status code(email already used)', function(done) {
            const newUser = {
                name: 'fauzan',
                email: 'fauzan@mail.com',
                password: 'fauzan',
                role: 'admin'
            }
            let data = { data: JSON.stringify(newUser) }
            chai
                .request(app)
                .post('/register')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('err')
                    expect(res.body.err).to.have.property('email')
                    expect(res.body.err.email).to.have.property('message')
                    expect(res.body.err.email.message).to.equal('email already used')
                    done()
                })
        })

    })

    describe('POST /login', function() {
        it('should send obj with 200 status code', function(done) {
            const newUser = {
                email: 'fauzan@mail.com',
                password: 'fauzan'
            }
            chai
                .request(app)
                .post('/login')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    token = res.body.token
                    done()
                })
        })

        it('should send obj with 400 status code(wrong email)', function(done) {
            const newUser = {
                email: 'faan@mail.com',
                password: 'fauzan'
            }
            chai
                .request(app)
                .post('/login')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('wrong email / password')
                    done()
                })
        })

        it('should send obj with 400 status code(wrong password)', function(done) {
            const newUser = {
                email: 'fauzan@mail.com',
                password: 'faan'
            }
            chai
                .request(app)
                .post('/login')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('wrong email / password')
                    done()
                })
        })

    })

    describe('POST /verifyToken', function() {
        it('should send an obj with 200 status code', function(done) {
            chai
                .request(app)
                .post('/verifyToken')
                .send({token})
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send an obj with 500 status code', function(done) {
            chai
                .request(app)
                .post('/verifyToken')
                .send({token: ''})
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

    })

})