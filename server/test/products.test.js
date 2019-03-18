const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../app')
const Product = require('../models/product')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

let token = null//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmM0MGU5YTcyMGUyZWRlNWQ4MWZjNSIsImZ1bGxfbmFtZSI6IlN1bHRhbiBBYnUgQmFrYXIiLCJlbWFpbCI6InN1bHRhbmhhc2FuYWhAbWFpbC5jb20iLCJpYXQiOjE1NTA1OTgzNzd9.EmszePftQzZUik8RTbUZqo6Y1vzScK2T2uYQgtMT53w'
let userId;
let userBeforeAllCreated;
let id;
let deletedId;

before(function (done) {
    clearUser(done)
})

before(function (done) {
    Product.create({
        name: 'Gelas',
        stock: 9,
        price: 11000,
        imageUrl: 'http://mahdihrs.world'
    })
        .then(newProd => {
            id = newProd._id
            deletedId = newProd._id
            done()
        })
        .catch(err => {
            done()
        })
})

before(function (done) {
    User.create({
        full_name: 'Admin 2',
        email: 'admin2@mail.com',
        password: '123123',
        role: 'admin'
    })
        .then(userCreated => {
            // userBeforeAllCreated = userCreated
            userId = userCreated._id
            token = generate(userCreated)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})


describe('CRUD Product', () => {
//     // describe.only('POST /products', () => {
    describe('POST /products', () => {
            it('should send back a created product in an object', (done) => {
                const newProduct = {
                    name: 'Pampers',
                    price: '17000',
                    stock: '4',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bhNcP7BTL._SY355_.jpg'
                };
                chai
                    .request(app)
                    .post('/products')
                    .set('access_token', token)
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res).to.be.an('object')
                        expect(res).to.be.json
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('imageUrl')
                        expect(res.body.name).to.equal(newProduct.name)
                        expect(res.body.price).to.equal(+newProduct.price)
                        expect(res.body.stock).to.equal(+newProduct.stock)
                        done()
                    })
            })

            // it('should send back an error message "Product name should not be empty" when user gives no product name', (done) => {
            //     const newProduct = {
            //         name: '',
            //         price: '17000',
            //         stock: '4',
            //         imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bhNcP7BTL._SY355_.jpg'
            //     };
            //     // res.status(400).json({
            //     //     msg: 'Product name should not be empty'
            //     // })
            //     chai
            //         .request(app)
            //         .post('/products')
            //         .set('access_token', token)
            //         .send(newProduct)
            //         .end(function (err, res) {
            //             expect(err).to.be.null
            //             expect(res).to.have.status(400)
            //             expect(res).to.be.an('object')
            //             expect(res).to.be.json
            //             expect(res.body.msg).to.equal('Product name should not be empty')
            //             done()
            //         })
            // })

            // it('should send back an error message "Can not set stock with 0" when user sends stock with value 0', (done) => {
            //     const newProduct = {
            //         name: 'Celana bayi',
            //         price: '100000',
            //         stock: '0',
            //         imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bhNcP7BTL._SY355_.jpg'
            //     };
            //     // res.status(400).json({
            //     //     msg: 'Can not set stock with 0" when user sends stock with value 0'
            //     // })
            //     chai
            //         .request(app)
            //         .post('/products')
            //         .set('access_token', token)
            //         .send(newProduct)
            //         .end(function (err, res) {
            //             expect(err).to.be.null
            //             expect(res).to.have.status(400)
            //             expect(res).to.be.an('object')
            //             expect(res).to.be.json
            //             expect(res.body.msg).to.equal('Can not set stock with 0')
            //             done()
            //         })
            // })

            // it('should send back an error message "Can not set price with 0" when user sends price with value 0', (done) => {
            //     const newProduct = {
            //         name: 'Celana bayi',
            //         price: '0',
            //         stock: '9',
            //         imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bhNcP7BTL._SY355_.jpg'
            //     };
            //     // res.status(400).json({
            //     //     msg: 'Price can not be set to 0'
            //     // })
            //     chai
            //         .request(app)
            //         .post('/products')
            //         .set('access_token', token)
            //         .send(newProduct)
            //         .end(function (err, res) {
            //             expect(err).to.be.null
            //             expect(res).to.have.status(400)
            //             expect(res).to.be.an('object')
            //             expect(res).to.be.json
            //             expect(res.body.msg).to.equal('Can not set price with 0')
            //             done()
            //         })
            // })

            // it('should send back an error message "Product should own an image" when user sends no image', (done) => {
            //     const newProduct = {
            //         name: 'Celana bayi',
            //         price: '100000',
            //         stock: '9',
            //         imageUrl: ''
            //     };
            //     chai
            //         .request(app)
            //         .post('/products')
            //         .set('access_token', token)
            //         .send(newProduct)
            //         .end(function (err, res) {
            //             expect(err).to.be.null
            //             expect(res).to.have.status(400)
            //             expect(res).to.be.an('object')
            //             expect(res).to.be.json
            //             expect(res.body.msg).to.equal('Product should own an image')
            //             done()
            //         })
            // })

            it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
                const newProduct = {
                    name: 'Celana bayi',
                    price: '100000',
                    stock: '9',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bhNcP7BTL._SY355_.jpg'
                };
                chai
                    .request(app)
                    .post('/products')
                    .set('access_token', '')
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('object')
                        expect(res).to.be.json
                        expect(res.body.msg).to.equal('Unauthorized Access')
                        done()
                    })
            })

            it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
                const newProduct = {
                    name: 'Celana bayi',
                    price: '100000',
                    stock: '9',
                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bhNcP7BTL._SY355_.jpg'
                };
                chai
                    .request(app)
                    .post('/products')
                    .set('access_token', 'salahtoken')
                    .send(newProduct)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('object')
                        expect(res).to.be.json
                        expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                        done()
                    })
            })
    })

    //done
    describe('GET /products', () => {
        it('should send back all products formed in array of objects', (done) => {
            chai
                .request(app)
                .get('/products')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.products).to.be.an('array')
                    for (let i = 0; i < res.body; i++) {
                        expect(res.body[i]).to.be.an('object')
                    }
                    done()
                })
        })

//             // before(function (done) {
//             //     Product.remove({})
//             //         .then(function () {
//             //             done()
//             //         })
//             // })

//             it('should send back "No data in database" when there is no single products in database', (done) => {
//                 chai
//                     .request(app)
//                     .get('/products')
//                     .end(function (err, res) {
//                         expect(err).to.be.null
//                         expect(res).to.have.status(200)
//                         expect(res.body.products).to.be.an('array').that.is.empty;
//                         expect(res.body.msg).to.equal('No data in database')
//                         done()
//                     })
//             })
    })

//     let dummyId = 'adoasjnd98h'

    describe(`GET /products/:id`, () => {
        it('should send back product detail in an object', (done) => {
            // console.log(id)
            chai
                .request(app)
                .get(`/products/${id}`)
                .end(function (err, res) {
                    // console.log('=-=-=-=-', res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send back an error message "Product not found" when the user search the wrong id', (done) => {
            chai
                .request(app)
                .get(`/products/5c72fb149e6fa533164f6c30`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
        })

            // it('should send back an error message "Cannot find product with id undefined" when the user search the wrong id', (done) => {
            //     chai
            //         .request(app)
            //         .get(`/products/${undefined}`)
            //         .end(function(err, res) {
            //             expect(err).to.be.null
            //             expect(res).to.have.status(400)
            //             expect(res.body).to.have.property('msg')
            //             expect(res.body).to.be.an('object')
            //             expect(res.body.msg).to.equal('Cannot find product with id undefined')
            //         })
            //         done()
            // })
    })

    describe(`PUT /products/:id`, () => {
        it('should give a response status 200 and user should be updated', (done) => {
            let newProduct = {
                name: 'Pampers',
                price: 17000,
                amount: 4,
                imageUrl: 'http://google.com'
            }
            chai
                .request(app)
                .put(`/products/${id}`)
                .set('access_token', token)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })

        it('should send back an error message "Product not found" when the user update the wrong id', (done) => {
            chai
                .request(app)
                .get(`/products/asx12198y2jk`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.equal('Product not found')
                })
                done()
        })

        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            let newProduct = {
                name: 'Pampers',
                price: 17000,
                amount: 4,
                imageUrl: 'http://google.com'
            }
            chai
                .request(app)
                .put(`/products/${id}`)
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            let newProduct = {
                name: 'Pampers',
                price: 17000,
                amount: 4,
                imageUrl: 'http://google.com'
            }
            chai
                .request(app)
                .put(`/products/${id}`)
                .set('access_token', 'salahtoken')
                .send(newProduct)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                    done()
                })
        })
    })

    describe(`DELETE /products/id`, () => {
        it('should give a response status 200 meaning that user successfully deleting a product', (done) => {
            chai
                .request(app)
                .delete(`/products/${id}`)
                .set('access_token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .delete(`/products/${id}`)
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
                .delete(`/products/${id}`)
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

    // after(function (done) {
    //     clearProduct(done)
    // })
    
    // after(function (done) {
    //     clearUser(done)
    // })
})

