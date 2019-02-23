const app = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect

chai.use(chaiHttp)

describe('CRUD Product', function() {
    describe('Create', function() {
        it('should return error 500 if user not input product name', function(done) {
            let productData = {
                description: 'Master Grade',
                price: 500000,
                category: 'Unit'
            }
            chai
                .request(app)
                .post('/products')
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    // property ada atau gak
                    // value ada atau gak
                    done()
                }) 
        })

        it('should return error 500 if user not input product price', function(done) {
            let productData = {
                name: 'wings',
                description: 'Master Grade',
                category: 'Unit'
            }
            chai
                .request(app)
                .post('/products')
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(500)
                    done()
                })
        })
    })

    describe('Update', function() {
        it('should return error 404 if user not input product name', function(done) {
            let productData = {
                description: 'Master Grade',
                price: 500000,
                category: 'Unit'
            }
            chai
                .request(app)
                .put(`/products/${id}`)
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should return error 404 if user not input product price', function(done) {
            let productData = {
                name: 'wings',
                description: 'Master Grade',
                category: 'Unit'
            }
            chai
                .request(app)
                .put(`/products/${id}`)
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null
    
                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should return error 404 if user not input product id', function(done) {
            let productData = {
                name: 'wings',
                description: 'Master Grade',
                price: 550000,
                category: 'Unit'
            }
            chai
                .request(app)
                .put('/products')
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(404)
                    done()
                })
        })
        it('should return product not found if user input wrong product id', function(done) {
            let productData = {
                name: 'wings',
                description: 'Master Grade',
                price: 550000,
                category: 'Unit'
            }
            chai
                .request(app)
                .put('/products/98232ioqwkl')
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(500)
                    done()
                })
        })
    })

    describe('Delete', function() {
        it('should return error 404 if user not input product id', function(done) {
            chai
            .request(app)
            .delete(`/products`)
            .end(function(err, res) {
                expect(err).to.be.null

                expect(res).to.have.status(404)
                expect(res.body).to.have.string('error')
                done()
            })
        })
        it('should return product not found if user input wrong product id', function(done) {
            chai
            .request(app)
            .delete(`/products/1298oiqwas`)
            .end(function(err, res) {
                expect(err).to.be.null

                expect(res).to.have.status(500)
                expect(res.body).to.be.an('object').that.has.all.keys('msg', 'err');
                expect(res.body.msg).to.have.string('Internal Server Error')
                done()
            })
        })
    })

    describe('Success CRUD', function() {
        let id = ''
        it('should create product without error ', function(done) {
            let productData = {
                name: 'wings',
                description: 'Master Grade',
                price: 500000,
                category: 'Unit'
            }
            chai
                .request(app)
                .post('/products')
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null

                    id = res.body.data._id

                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.be.a('object')
                    expect(res.body.data.name).to.equal(productData.name)
                    done()
                }) 
        })

        it('should return all data in products', function(done) {
            chai
                .request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.lengthOf.at.least(1);
                    done()
                })
        })

        it('should update a selected products with new value', function(done) {
            let productData = {
                name: 'wings',
                description: 'High Grade',
                price: 200000,
                category: 'Unit'
            }
            chai
                .request(app)
                .put(`/products/${id}`)
                .send(productData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.be.a('object')
                    expect(res.body.data.name).to.equal(productData.name)
                    done()
                })
        })

        it('should delete a selected products in database', function(done) {
            chai
                .request(app)
                .delete(`/products/${id}`)
                .end(function(err, res) {
                    expect(err).to.be.null

                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.be.a('object')
                    done()
                })
        })
    })
})