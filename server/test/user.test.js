const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const { clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

after(function(done) {
  clearCart(done)
})

after( function(done) {
  clearUser(done)
})



describe('USER TEST', function() {

  describe('register new user', function() {

    it('should be send message registered successfully', function(done) {

      let input = {
        name : 'maman',
        email : 'maman@mail.com',
        password : 'cancan',
        role : 'admin'
      }

      chai
        .request(app)
        .post('/register')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('registered successfully')
          expect(res.body).to.have.property('data')
          expect(res.body.data._id).to.be.a('string')
          done()
        })
    })

    it('should be send message registered successfully as user', function(done) {

      let input = {
        name : 'maman',
        email : 'maman2@mail.com',
        password : 'cancan'
      }

      chai
        .request(app)
        .post('/register')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('registered successfully')
          expect(res.body).to.have.property('data')
          expect(res.body.data.role).to.equal('user')
          expect(res.body.data._id).to.be.a('string')
          done()
        })
    })

    it('should be send message error validation role', function(done) {

      let input = {
        name : 'maman',
        email : 'notadmin@mail.com',
        password : 'cancan',
        role : 'notadmin'
      }

      chai
        .request(app)
        .post('/register')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('failed register')
          expect(res.body).to.have.property('err')
          expect(res.body.err).to.equal('User validation failed: role: `notadmin` is not a valid enum value for path `role`.')
          done()
        })
    })

    it('should be send message email is taken', function(done) {

      let input = {
        name : 'alreadyUsedEmail',
        email : 'maman@mail.com',
        password : 'cancan',
        role : 'user'
      }

      chai
        .request(app)
        .post('/register')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('failed register')
          expect(res.body).to.have.property('err')
          expect(res.body.err).to.equal('User validation failed: email: this email is taken. please use another email.')
          // expect(res.body.data._id).to.be.a('string')
          done()
        })
    })

    it('should be send message name must be at least 4', function(done) {

      let input = {
        name : 'mam',
        email : 'mam@mail.com',
        password : 'cancan',
        role : 'user'
      }

      chai
        .request(app)
        .post('/register')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('failed register')
          expect(res.body).to.have.property('err')
          expect(res.body.err).to.equal('User validation failed: name: name must be at least 4 character long')
          // expect(res.body.data._id).to.be.a('string')
          done()
        })
    })

    it('should be send message invalid email format', function(done) {

      let input = {
        name : 'maman',
        email : 'notanemail',
        password : 'cancan',
        role : 'user'
      }

      chai
        .request(app)
        .post('/register')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('failed register')
          expect(res.body).to.have.property('err')
          expect(res.body.err).to.equal('User validation failed: email: invalid email format')
          // expect(res.body.data._id).to.be.a('string')
          done()
        })
    })

    it('should be send message password must be at least 6', function(done) {

      let input = {
        name : 'mamaman',
        email : 'real@email.com',
        password : 'short',
        role : 'user'
      }
      chai
      .request(app)
      .post('/register')
      .send(input)
      .end( function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('failed register')
        expect(res.body).to.have.property('err')
        expect(res.body.err).to.equal('User validation failed: password: password must be at least 6 character long')
        done()
      })

    })
  })

  describe('login user', function() {

    it('should be send message login successfully', function(done) {

      let input = {
        email : 'maman@mail.com',
        password : 'cancan'
      }

      chai
        .request(app)
        .post('/login')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('login successful')
          // console.log(res.body.token)
          expect(res.body).to.have.property('token')
          done()
        })
    })

    it('should be send message invalid or email password', function(done) {
      
      let input = {
        email : 'wrong@email.com',
        password : 'notcancan'
      }

      chai
        .request(app)
        .post('/login')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('invalid email or password')
          done()
        })
    })

    it('should be send message invalid email or password', function(done) {
      
      let input = {
        email : 'maman@mail.com',
        password : 'notcancan'
      }

      chai
        .request(app)
        .post('/login')
        .send(input)
        .end( function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('invalid email or password')
          done()
        })
      
    })
  })
})