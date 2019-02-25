const chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    clearProduct = require('../helpers/clearProduct')

chai.use(chaiHttp)

const newUser = {
    name: 'aji',
    email: 'aji@mail.com',
    password: 'aji',
    role: 'admin'
}
let token = ''
let productId = ''
before(function(done) {
    clearProduct(done)
    let data = {data: JSON.stringify(newUser)}
    it('should send an new user obj with 201 status code', function(done) {
        chai
            .request(app)
            .post('/register')
            .send(data)
            .end(function(err, res) {
                done()
            })
    })
    it('should send obj with 200 status code', function(done) {
        chai
            .request(app)
            .post('/login')
            .send({email: newUser.email, password: newUser.password})
            .end(function(err, res) {
                token = res.body.token
                done()
            })
    })
})

after(function(done) {
    clearProduct(done)
})

describe('Product Test', function() {
    describe('POST /products', function() {
        it('should send obj with 201 status code', function(done) {
            let newProduct = {
                name: 'product',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.price).to.equal(newProduct.price)
                    expect(res.body.stock).to.equal(newProduct.stock)
                    productId = res.body._id
                    done()
                })
        })

        it('should send obj with 400 status code(required name)', function(done) {
            let newProduct = {
                name: '',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors).to.have.property('name')
                    expect(res.body.errors.name).to.have.property('message')
                    expect(res.body.errors.name.message).to.equal('product name required')
                    done()
                })
        })

        it('should send obj with 400 status code(required price)', function(done) {
            let newProduct = {
                name: 'ada',
                price: null,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors).to.have.property('price')
                    expect(res.body.errors.price).to.have.property('message')
                    expect(res.body.errors.price.message).to.equal('product price required')
                    done()
                })
        })

        it('should send obj with 400 status code(required stock)', function(done) {
            let newProduct = {
                name: 'ada',
                price: 1000,
                stock: null
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors).to.have.property('stock')
                    expect(res.body.errors.stock).to.have.property('message')
                    expect(res.body.errors.stock.message).to.equal('product stock required')
                    done()
                })
        })

        it('should send obj with 500 status code(token required)', function(done) {
            let newProduct = {
                name: 'ada',
                price: 1000,
                stock: 99
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .set('token', 'ssjfjdnj')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

    })

    describe('GET /products', function() {
        it('should send array with 200 status code', function(done) {
            chai
                .request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('GET /products/productId', function() {
        it('should send object with 200 status code', function(done) {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send object with 500 status code(wrong productId)', function(done) {
            chai
                .request(app)
                .get(`/products/${productId}a`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

    })

    describe('PUT /products/:productId', function() {
        it('should send obj with 200 status code', function(done) {
            let newProduct = {
                name: 'product',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.price).to.equal(newProduct.price)
                    expect(res.body.stock).to.equal(newProduct.stock)
                    productId = res.body._id
                    done()
                })
        })

        it('should send obj with 400 status code', function(done) {
            let newProduct = {
                name: 'product',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}a`)
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send obj with 400 status code(required name)', function(done) {
            let newProduct = {
                name: '',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors).to.have.property('name')
                    expect(res.body.errors.name).to.have.property('message')
                    expect(res.body.errors.name.message).to.equal('product name required')
                    done()
                })
        })

        it('should send obj with 400 status code(required price)', function(done) {
            let newProduct = {
                name: 'ada',
                price: null,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors).to.have.property('price')
                    expect(res.body.errors.price).to.have.property('message')
                    expect(res.body.errors.price.message).to.equal('product price required')
                    done()
                })
        })

        it('should send obj with 400 status code(required stock)', function(done) {
            let newProduct = {
                name: 'ada',
                price: 1000,
                stock: null
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('token', token)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors).to.have.property('stock')
                    expect(res.body.errors.stock).to.have.property('message')
                    expect(res.body.errors.stock.message).to.equal('product stock required')
                    done()
                })
        })

        it('should send obj with 500 status code(token required)', function(done) {
            let newProduct = {
                name: 'ada',
                price: 1000,
                stock: 99
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('token', 'ssjfjdnj')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })

    describe('DELETE /products/:productId', function() {
        it('should send object with 200 status code', function(done) {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send object with 500 status code', function(done) {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('token', 'token')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send object with 500 status code(wrong productId)', function(done) {
            chai
                .request(app)
                .delete(`/products/${productId}a`)
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
})