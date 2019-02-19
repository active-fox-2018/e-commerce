// const
//   chai = require('chai'),
//   chaiHttp = require('chai-http'),
//   expect = chai.expect,
//   app = require('../app');

// chai.use(chaiHttp);

// var token = '';
// var productId = '';


// describe('Add and remove items to / in cart with Authorized User', function () {

//   describe('Add to cart', function () {

//     it('should REGISTER a new user with status code 201', function (done) {
//       const newUser = {
//         name: 'Arief',
//         email: 'arvv@gmail.com',
//         password: '123'
//       }
//       chai
//         .request(app)
//         .post('/register')
//         .send(newUser)
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           expect(res.body).to.be.an('object');
//           expect(res.body.user).to.have.property('_id');
//           expect(res.body.user).to.have.property('email');
//           expect(res.body.user).to.have.property('password');
//           done();
//         });
//     });

//     it('should return new user and access_token with status code 200', function (done) {
//       const newUser = {
//         name: 'Arief',
//         email: 'arvv@gmail.com',
//         password: '123'
//       }
//       chai
//         .request(app)
//         .post('/login')
//         .send(newUser)
//         .end(function (err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.haveOwnProperty('access_token');
//           expect(res.body).to.haveOwnProperty('message');
//           token = res.body.access_token;
//           done();
//         })
//     });

//     it('should return new object with status code 201', function (done) {
//       const product = {
//         productName: 'The Lord of the Rings',
//         price: 120000,
//         stock: 20
//       }
//       chai
//         .request(app)
//         .post('/products')
//         .send(product)
//         .end(function (err, res) {
//           // console.log(res.body);
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           expect(res.body.data).to.be.an('object');
//           expect(res.body.data).to.haveOwnProperty('_id');
//           expect(res.body.data).to.haveOwnProperty('productName');
//           expect(res.body.data).to.haveOwnProperty('price');
//           expect(res.body.data).to.haveOwnProperty('stock');
//           expect(res.body.data.price).to.equal(product.price);
//           expect(res.body.data.stock).to.equal(product.stock);
//           productId = res.body.data._id;
//           done();
//         });
//     });

//     it('should return new object cart with status code 201', function (done) {
//       chai
//         .request(app)
//         .post(`/carts/${productId}`)
//         .set('token', token)
//         .end(function (err, res) {
//           // expect(err).to.be.null;
//           // expect(res).to.have.status(200);
//           done();
//         });
//     });


//   });
// });
