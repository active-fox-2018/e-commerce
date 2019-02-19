const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp)

var token = ''
var fakeToken = 'akdokmdk'
var wrongJwtSecret = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmFiNjJmNDAxYzIzMWM5MDZlYTcwYyJ9.P6gOsFof3relhVzdFy_hxqSi_9s0rguAFRAB56uK968`
var notMongooseId = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmFiNjJmNDAxYzIzMWM5MDZlYWMifQ.mAac0-2oCwqiW8pBHHXpYSEm9Ug52gNk8x5YP-JlFPM`

describe('USER', () => {

    describe('Create user', function (done) {
        it('should return created user data and token', function (done) {
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
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('token')
                    expect(res.body.data.name).to.equal(newUser.name)
                    expect(res.body.data.password).to.not.equal(newUser.password)
                    token = res.body.token
                    done()
                })
        })

        it('should return Email already taken', function (done) {
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
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('should return Please fill name, email, address and password', function (done) {
            let data = { }
            chai.request(app)
                .post('/users')
                .send(data)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please fill name, email, address and password')
                    done()
                })
        })

        it('should return email is not valid', function (done) {
            let data = { 
                name: 'haha',
                email: 'haha',
                password: 'haha',
                address: 'haha'
            }
            chai.request(app)
                .post('/users')
                .send(data)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User validation failed: email: Please fill valid email address')
                    done()
                })
        })
    })
    
    describe('Login user', () => {
        it(`should return user data and token login using email`, function (done) {
            let info = {
                input: 'admin@mail.com',
                password: 'admin'
            }
            chai.request(app)
                .post('/users/login')
                .send(info)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('token')
                    token = res.body.token
                    done()
                })
        })

        it(`should return user data and token login using phone num`, function (done) {
            let info = {
                input: '081238493',
                password: 'admin'
            }
            chai.request(app)
                .post('/users/login')
                .send(info)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('token')
                    token = res.body.token
                    done()
                })
        })

        it(`should return Please register first`, function (done) {
            let info = {
                input: '081238,s493',
                password: 'admin'
            }
            chai.request(app)
                .post('/users/login')
                .send(info)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Please register first`)
                    done()
                })
        })

        it(`should return all field must be filled`, function (done) {
            let info = {
                input: '081238493',
                password: 'admin'
            }
            chai.request(app)
                .post('/users/login')
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`All field must be filled`)
                    done()
                })
        })

        it(`should return wrong password`, function (done) {
            let info = {
                input: '081238493',
                password: 'admina'
            }
            chai.request(app)
                .post('/users/login')
                .send(info)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Wrong password / email / phone')
                    done()
                })
        })
    })

    describe('Get one user', () => {
        it(`should return logged in user data`, function (done) {
            chai.request(app)
                .get('/users/me')
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    done()
                })
        })

        it(`should return  token invalid`, function (done) {
            chai.request(app)
                .get('/users/me')
                .set({ token: wrongJwtSecret })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it(`should return user id invalid`, function (done) {
            chai.request(app)
                .get('/users/me')
                .set({ token: notMongooseId })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it(`should return please log in first`, function (done) {
            chai.request(app)
                .get('/users/me')
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

    })

    describe('Update user', () => {
        before(function (done){
            let user2 = {
                email: `user2@mail.com`,
                password: 'user2',
                name: 'user2',
                address: 'bull'
            }
            User.create(user2)
                .then(data => {
                    done()
                })
        })

        after( function (done) {
            User.deleteOne({ email: `user2@mail.com`})
                .then( data => {
                    done()
                })
        })

        it('should return updated user data', function (done) {
            let update = {
                address: `bukan bulan`
            }
            chai.request(app)
                .put('/users')
                .send(update)
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('address')
                    expect(res.body.address).to.equal(update.address)
                    done()
                })
        })

        it('should return email already taken', function (done) {
            let email2 = {
                email: `user2@mail.com`
            }
            chai.request(app)
                .put('/users')
                .set({ token })
                .send(email2)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('should return login first', function (done) {
            let update = {
                address: `bukan bulan`
            }
            chai.request(app)
                .put('/users')
                .send(update)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('should return please fill something', function (done) {
            let update = {
                address: `bukan bulan`
            }
            chai.request(app)
                .put('/users')
                .send()
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Please fill something`)
                    done()
                })
        })

    })

    describe('Delete user', () => {
        it('should delete user with given token', function (done) {
            chai.request(app)
                .delete('/users')
                .set({ token })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('_id')
                    done()
                })
        })
    
        it('should return token is not valid (random jwt)', function (done) {
            chai.request(app)
                .delete('/users')
                .set({ token: fakeToken })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.be.a('string')
                    expect(res.body.msg).to.equal('Token invalid!')
                    done()
                })
    
        })

        it('should return please login first', function (done) {
            chai.request(app)
                .delete('/users')
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please login first')
                    done()
                })
        })

        it('should return user not found because user with that id already deleted', function (done) {
            chai.request(app)
                .delete('/users')
                .set({ token })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User not found')
                    done()
                })
        })

        it('should return token invalid (wrong jwt secret)', function (done) {
            chai.request(app)
                .delete('/users')
                .set({ token: wrongJwtSecret })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Token invalid!')
                    done()
                })
        })
        
        it('should return user id is invalid', function (done) {
            chai.request(app)
                .delete('/users')
                .set({ token: notMongooseId })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User id is not valid')
                    done()
                })
        })
    })

})
