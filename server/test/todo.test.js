const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../app')
clearTodo = require('../helpers/clearTodo');

chai.use(chaiHttp);

before(function (done) {
  clearTodo(done)
  // done()
});

after(function (done) {
  clearTodo(done);
  // done()
});

let id = ''
let cartId = ''
let itemToCart = ''

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmJiY2ViZGY5NGIxMTg2ZjY0ZjY3NiIsImVtYWlsIjoiYWhtYWRAbWFpbC5jb20iLCJpYXQiOjE1NTA1NjQ1ODd9.wPT5kBN6Zl7zkLFKhH_fSMUDQiGise2TR9r8cc_csSM'

describe('products tests', function () {

  describe('POST /users', function () {
    it('should send an object of created USER with 201 status code', function (done) {
      const newUser = {
        name: 'samsong',
        email: 'ahmad@mail.com',
        password: '123456',
        role: 'admin'
      };
      chai
        .request(app)
        .post('/users')
        .send(newUser)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('email');
          expect(res.body.name).to.equal(newUser.name);
          done();
        })

    })

    it('should send an error with value field name required', function (done) {
      const newUser2 = {
        name: '',
        email: 'ibenk@mail.com',
        password: '123456',
        role: 'regular'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser2)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `name` is required')
          done()
        })
    })


    it('should send an error with value field email required', function (done) {
      const newUser3 = {
        name: 'johny',
        email: '',
        password: '123456',
        role: 'regular'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser3)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `email` is required')
          done()
        })
    })

    it('should send an error with value field password required', function (done) {
      const newUser4 = {
        name: 'johny',
        email: 'johny@mail.com',
        password: '',
        role: 'regular'
      }
      chai
        .request(app)
        .post('/users')
        .send(newUser4)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `password` is required')
          done()
        })
    })

    it('should send an error with value email already used', function (done) {
      const newUser5 = {
        name: 'samsong',
        email: 'ahmad@mail.com',
        password: '123456',
        role: 'admin'
      };
      chai
        .request(app)
        .post('/users')
        .send(newUser5)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Email is already been used')
          done()
        })
    })

  })


  describe('POST /user/LOGIN', function () {
    it('should send an object of USER LOGIN with 200 status code', function (done) {
      const loginUser = {
        email: 'ahmad@mail.com',
        password: '123456'
      };
      chai
        .request(app)
        .post('/users/login')
        .send(loginUser)
        .end(function (err, res) {
          token = res.body.token
          // console.log(res.body.token);


          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        })

    })
  })


  describe('POST /product', function () {
    it('should send an object of inserted PRODUCT with 201 status code', function (done) {
      const data = {
        name: 'samsong',
        description: 'hp paling mutakir',
        price: 100000,
        stock: 100,
        image: 'image'
      };
      chai
        .request(app)
        .post('/products')
        .send({data})
        .set({ 'token': token })
        .end(function (err, res) {
          id = res.body._id
          itemToCart = res.body
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('description');
          expect(res.body.name).to.equal(data.name);
          expect(res.body.description).to.equal(data.description);
          done();
        })
    })

    it('should send an error with value path `name`required', function (done) {
      const data = {
        name: '',
        description: 'hp paling mutakir',
        price: 100000,
        stock: 100,
        image: 'image'
      }
      chai
        .request(app)
        .post('/products')
        .send({data})
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `name` is required')
          done()
        })
    })

    it('should send an error with value path `description`required', function (done) {
      const data = {
        name: 'simsong',
        description: '',
        price: 100000,
        stock: 100,
        image: 'image'
      }
      chai
        .request(app)
        .post('/products')
        .send({data})
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `description` is required')
          done()
        })
    })

    it('should send an error with value path `price`required', function (done) {
      const data = {
        name: 'simsong',
        description: 'mahal',
        price: '',
        stock: 100,
        image: 'image'
      }
      chai
        .request(app)
        .post('/products')
        .send({data})
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `price` is required')
          done()
        })
    })

    it('should send an error with value path `stock`required', function (done) {
      const data = {
        name: 'simsong',
        description: 'mahal',
        price: 10,
        stock: '',
        image: 'image'
      }
      chai
        .request(app)
        .post('/products')
        .send({data})
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `stock` is required')
          done()
        })
    })

    it('should send an error with value path `image`required', function (done) {
      const data = {
        name: 'simsong',
        description: 'mahal',
        price: 10,
        stock: 5,
        image: ''
      }
      chai
        .request(app)
        .post('/products')
        .send({data})
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.equal('Path `image` is required')
          done()
        })
    })

  })

  describe('GET /products', function () {
    it('should send an array with 200 status code', function (done) {
      chai
        .request(app)
        .get('/products')
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
      // done()
    });
  });

  describe('PATCH /product/:id', function () {
    it('should send an objct with 200 status code', function (done) {
      const editProduct = {
        name: 'samsciumong',
        description: 'hp paling mutakir',
        price: 50000,
        stock: 100,
        image: 'image'
      };
      chai
        .request(app)
        .patch(`/product/${id}`)
        .send(editProduct)
        .set({ 'token': token })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(editProduct.name);
          done();
        });
    });
  });

  // describe('DELETE /product/:id', function () {
  //   it('should send an CONFIRMATION DELETE SUCCESS with 200 status code', function (done) {

  //     chai
  //       .request(app)
  //       .delete(`/product/${id}`)
  //       .set({ 'token': token })
  //       .end(function (err, res) {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         expect(res.body.message).to.equal('deleted')
  //         done();
  //       });
  //   });
  // });


  describe('POST /carts', function() {
    it('should send an object of new created cart', function(done) {
      let user = id
      chai
        .request(app)
        .post(`/carts`)
        .send({
          id : user
        })
        .end(function(err,res){
          cartId = res.body._id
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('bucket')
          expect(res.body.bucket).to.be.an('array')
          done()
        })
      })
  })



  describe('Patch /carts', function() {
    it('should send an object of new updated cart', function(done) {    
      chai
        .request(app)
        .patch(`/carts/${cartId}`)
        .send([itemToCart._id])
        .end(function(err,res){
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.bucket[0]).to.equal(itemToCart._id)
          done()
        })
      })
  })

  describe('delete /carts', function() {
    it('should send an message succes delete cart', function(done) {    
      chai
        .request(app)
        .delete(`/carts/${cartId}`)
        .end(function(err,res){
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done()
        })
      })
  })


});
