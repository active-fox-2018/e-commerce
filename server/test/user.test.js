const
  chai = require('chai'),
  chaiHtpp = require('chai-http'),
  expect = chai.expect,
  app = require('../app');

const clearUser = require('../helpers/clearUser');
chai.use(chaiHtpp);

var token = '';

before(function (done) {
  clearUser(done);
});

after(function (done) {
  clearUser(done);
});

describe('Validate User', function () {
  describe('POST /register', function () {
    it('should REGISTER a new user with status 201', function (done) {
      const user = {
        name: 'Arief',
        email: 'arrv@mail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/register')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user).to.haveOwnProperty('_id');
          expect(res.body.user).to.haveOwnProperty('name');
          expect(res.body.user).to.haveOwnProperty('email');
          expect(res.body.user).to.haveOwnProperty('password');
          done();
        })
    });

    it('should SEND error message when name is empty', function (done) {
      const user = {
        name: '',
        email: 'arrv@mail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/register')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Please input your name');
          done();
        });
    });

    it('should SEND error message when email is empty', function (done) {
      const user = {
        name: 'Arief',
        email: '',
        password: '123'
      }
      chai
        .request(app)
        .post('/register')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Please input your email');
          done();
        });
    });

    it('should send error message when email already exists', function (done) {
      const user = {
        name: 'Arief',
        email: 'arrv@mail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/register')
        .send(user)
        .end(function (err, res) {
          // console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Email already exists');
          done();
        });
    });

    it('should SEND ERROR message when password is empty', function (done) {
      const user = {
        name: 'Arief',
        email: 'arrv@gmail.com',
        password: ''
      }
      chai
        .request(app)
        .post('/register')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.equal('Password cannot be empty');
          done();
        });
    });
  });

  describe('User Login', function () {
    it('should Login with status 200', function (done) {
      const user = {
        email: 'arrv@mail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/login')
        .send(user)
        .end(function (err, res) {
          token = res.body.access_token;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('access_token');
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body.message).to.equal('Successfully login')
          done();
        });
    });

    it('should SEND error if password doesnt match', function () {
      const user = {
        email: 'arrv@mail.com',
        password: '1234'
      }
      chai
        .request(app)
        .post('/login')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Wrong Password');
        });
    });

    it('should SEND error if email is not registered', function () {
      const user = {
        email: 'arrv@gmail.com',
        password: '1234'
      }
      chai
        .request(app)
        .post('/login')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Email is not registered');
        });
    });
  });
});