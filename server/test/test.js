const chai = require('chai'),
  chaiHttp = require('chai-http'),
  {
    expect
  } = chai,
  app = require('../app'),
  User = require('../models/user'),
  Cart = require('../models/cart'),
  Item = require('../models/item'),
  Transaction = require('../models/transaction')

chai.use(chaiHttp)

before(function (done) {
  User.deleteMany({})
    .then(function () {
      return Cart.deleteMany({})
    })
    .then(function () {
      return Item.deleteMany({})
    })
    .then(function () {
      return Transaction.deleteMany({})
    })
    .then(data => {

    })
  done()
})

let adminToken = ''
let custToken = ''
let idItem1 = ''
let idItem2 = ''
let idCust = ''
let cartId = ''
let transactionId = ''


describe('Register Admin, login and action for items', function () {
  it('should create admin and get respon 201', function (done) {
    const admin = {
      name: 'maria',
      email: 'maria@mail.com',
      password: 'mariaulfa'
    }
    chai
      .request(app)
      .post('/register/admin')
      .send(admin)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res.body).to.have.nested.property('user')
          .that.includes.all.keys(['_id', 'email', 'password'])
        done()
      })
  })

  it('should login as an admin', function (done) {
    const adminLogin = {
      email: 'maria@mail.com',
      password: 'mariaulfa'
    }
    chai
      .request(app)
      .post('/login')
      .send(adminLogin)
      .end(function (err, res) {
        adminToken = res.body.token
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.nested.property('token')
        done()
      })

  })

  it('should failed login as admin because the password/email is wrong', function (done) {
    const adminLogin2 = {
      email: 'maraia@mail.com',
      password: 'mariaulfa'
    }
    chai
      .request(app)
      .post('/login')
      .send(adminLogin2)
      .end(function (err, res) {
        expect(res).to.have.status(404)
        expect(res).to.be.json
        done()
      })
  })

  describe('admin crud items', function () {
    it('Admin create new item and get response 201', function (done) {
      const newItem = {
        name: 'baju',
        image: 'baju.jpg',
        price: 1000,
        stock: 10
      }
      chai
        .request(app)
        .post('/items')
        .send(newItem)
        .set('token', adminToken)
        .end(function (err, res) {
          idItem1 = res.body.item._id
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res).to.be.json
          expect(res.body).to.have.nested.property('item')
            .that.includes.all.keys(['_id', 'image', 'price', 'stock', 'name'])
          done()
        })
    })

    it('Admin still can create new item without the image and get response 201', function (done) {
      const itemWithoutImage = {
        name: 'baju',
        price: 1000,
        stock: 10
      }
      chai
        .request(app)
        .post('/items')
        .send(itemWithoutImage)
        .set('token', adminToken)
        .end(function (err, res) {
          idItem2 = res.body.item._id
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res).to.be.json
          expect(res.body).to.have.nested.property('item')
            .that.includes.all.keys(['_id', 'name', 'price', 'stock'])
          done()
        })
    })

    it('admin succsess updated an items adn get respon 200', function(done) {
      const updated = {
        name: 'celana',
        image: 'baju.jpg',
        price: 1000,
        stock: 10
      }
      chai
        .request(app)
        .put(`/items/${idItem1}`)
        .send(updated)
        .set('token', adminToken)
        .end(function(err, res) {
          expect(res).to.have.status(200)
          done()
        })
    })

    it('admin failed updating an items, because the Id is not found', function(done) {
      const failUpdated = {
        name: 'celana',
        image: 'baju.jpg',
        price: 1000,
        stock: 10
      }
     chai
        .request(app)
        .put(`/items/123456789`)
        .send(failUpdated)
        .set('token', adminToken)
        .end(function(err, res) {
          expect(res).to.have.status(500)
          done()
        })
    })

    describe('create for delete it later', function() {
      let idImaginaryItem = ''
      it('admin sucsses create then delete an items', function(done) {
        const imaginaryItem =  {
          name: 'topi',
          image: 'topi.jpg',
          price: 100,
          stock: 1
        }
        chai
        .request(app)
        .post('/items')
        .send(imaginaryItem)
        .set('token', adminToken)
        .end(function (err, res) {
          idImaginaryItem = res.body.item._id
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res).to.be.json
          expect(res.body).to.have.nested.property('item')
            .that.includes.all.keys(['_id', 'image', 'price', 'stock', 'name'])
            done()
        })
      })

      it('admin sucsses delete an items', function(done) {
        chai
        .request(app)
        .delete(`/items/${idImaginaryItem}`)
        .set('token', adminToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
        })
      })

      it('admin failed delete an items because the ite already gone', function(done) {
        chai
        .request(app)
        .delete(`/items/${idImaginaryItem}`)
        .set('token', adminToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res).to.be.json
          done()
        })
      })
    })

    describe('admin fail create item because forget to fill name/stock/price', function () {
      it('should fail because forget to fill name', function (done) {
        const itemForgetName = {
          image: 'baju.jpg',
          price: 1000,
          stock: 10
        }
        chai
          .request(app)
          .post('/items')
          .send(itemForgetName)
          .set('token', adminToken)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res).to.be.json
            expect(res.body.err).to.equal('Item validation failed: name: Path `name` is required.')
            done()
          })
      })

      it('should fail because forget to fill price', function (done) {
        const itemForgetPrice = {
          name: 'pakaian',
          image: 'baju.jpg',
          stock: 10
        }
        chai
          .request(app)
          .post('/items')
          .send(itemForgetPrice)
          .set('token', adminToken)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res).to.be.json
            expect(res.body.err).to.equal('Item validation failed: price: Path `price` is required.')
            done()
          })
      })

      it('should fail because forget to fill stock', function (done) {
        const itemForgetPrice = {
          name: 'pakaian',
          image: 'baju.jpg',
          price: 1000
        }
        chai
          .request(app)
          .post('/items')
          .send(itemForgetPrice)
          .set('token', adminToken)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res).to.be.json
            expect(res.body.err).to.equal('Item validation failed: stock: Path `stock` is required.')
            done()
          })
      })
    })
  })

  describe('non Admin / not login crud items', function () {
    it('non admin can\'t create new item and get response 401', function (done) {
      const newItem = {
        name: 'baju',
        image: 'baju.jpg',
        price: 1000,
        stock: 10
      }
      chai
        .request(app)
        .post('/items')
        .send(newItem)
        .set('token', '192083')
        .end(function (err, res) {
          expect(res).to.have.status(401)
          expect(res).to.be.json
          done()
        })
    })   

    it('Non Admin still can\'t create new item without the image and get response 401', function (done) {
      const itemWithoutImage = {
        name: 'baju',
        price: 1000,
        stock: 10
      }
      chai
        .request(app)
        .post('/items')
        .send(itemWithoutImage)
        .set('token', '192083')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res).to.be.json
          done()
        })
    })
    
    it('admin wants to find all transaction and get status 200', function(done) {
      chai
        .request(app)
        .get('/transactions')
        .set('token', adminToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.be.json
          done()
        })
    })
  })
})

describe('read all items', function() {
  it('should get all items', function(done) {
    chai
    .request(app)
    .get('/items')
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.be.an('array')
      done()
    })
  })
})

describe('customer activities', function() {
  it('should register new costumer', function(done) {
    const cust = {
      name : 'ulfa',
      email : 'ulfa@mail.com',
      password : 'mariaulfa'
    }
    chai
      .request(app)
      .post('/register')
      .send(cust)
      .end(function(err, res){
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res.body).to.have.nested.property('user')
          .that.includes.all.keys(['_id', 'email', 'password'])
        done()
      })
  })

  it('should fail register new costumer because the email already exists', function(done) {
    const cust = {
      name : 'ulfa',
      email : 'ulfa@mail.com',
      password : 'mariaulfa'
    }
    chai
      .request(app)
      .post('/register')
      .send(cust)
      .end(function(err, res){
        expect(err).to.be.null
        expect(res).to.have.status(500)
        expect(res).to.be.json
        expect(res.body.err).to.equal('User validation failed: email: Gunakan Email lain')
        done()
      })
  })

  it('should fail register new costumer because the password is too long', function(done) {
    const cust = {
      name : 'ulfa',
      email : 'gaga@mail.com',
      password : 'mariaulfamariaulfamariaulfamariaulfamaialulfa'
    }
    chai
      .request(app)
      .post('/register')
      .send(cust)
      .end(function(err, res){
        expect(err).to.be.null
        expect(res).to.have.status(500)
        expect(res).to.be.json
        expect(res.body.err).to.equal('User validation failed: password: password minimal 20 karakter')
        done()
      })
  })

  it('should fail register new costumer because the password is too short', function(done) {
    const cust = {
      name : 'ulfa',
      email : 'gaga@mail.com',
      password : 'mar'
    }
    chai
      .request(app)
      .post('/register')
      .send(cust)
      .end(function(err, res){
        expect(err).to.be.null
        expect(res).to.have.status(500)
        expect(res).to.be.json
        expect(res.body.err).to.equal('User validation failed: password: password minimal 8 karakter')
        done()
      })
  })

  it('should fail register new costumer because the password is too short', function(done) {
    const cust = {
      name : 'ulfa',
      email : 'gaga@mail.com',
      password : 'mar'
    }
    chai
      .request(app)
      .post('/register')
      .send(cust)
      .end(function(err, res){
        expect(err).to.be.null
        expect(res).to.have.status(500)
        expect(res).to.be.json
        expect(res.body.err).to.equal('User validation failed: password: password minimal 8 karakter')
        done()
      })
  })

  it('should still registered a new costumer even not filling the name', function(done) {
    const cust = {
      email : 'gaga@mail.com',
      password : 'mariaulfa'
    }
    chai
      .request(app)
      .post('/register')
      .send(cust)
      .end(function(err, res){
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res.body).to.have.nested.property('user')
        .that.includes.all.keys(['_id', 'email', 'password'])
        done()
      })
  })

  it('should login new as a costumer and get special token', function(done) {
    const custLogin = {
      email : 'ulfa@mail.com',
      password : 'mariaulfa'
    }
    chai
    .request(app)
    .post('/login')
    .send(custLogin)
    .end(function (err, res) {
      custToken = res.body.token
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.have.nested.property('token')
      done()
    })
  })

  it('should can update the users info after login', function(done) {
    const updatedData = {
      email : 'ulfa@mail.com',
      password : 'mariaulfa',
      name: 'belina'
    }

    chai
    .request(app)
    .put(`/users`)
    .send(updatedData)
    .set('token', custToken)
    .end(function (err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      done()
    })
  })

  it('should fail login new as a costumer because email or password is wrong', function(done) {
    const custLogin = {
      email : 'ulfa@mail.com',
      password : 'mariaula'
    }
    chai
    .request(app)
    .post('/login')
    .send(custLogin)
    .end(function (err, res) {
      expect(res).to.have.status(404)
      expect(res).to.be.json
      done()
    })
  })

  it('should return a satus 201 because user can create a new cart', function(done) {
    const cartUser = {
      item : idItem1,
      quantity : 2
    }
    chai
      .request(app)
      .post('/addToCart')
      .send(cartUser)
      .set('token', custToken)
      .end(function(err, res) {
        cartId = res.body.cart._id
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        done()
      })
  })

  it('should change the cart of user into new quantity from last add to cart activity', function(done) {
    const cartUser = {
      item : idItem1,
       quantity : 3
    }
    chai
      .request(app)
      .post('/addToCart')
      .send(cartUser)
      .set('token', custToken)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        done()
      })
  })

  it('should remove the cart because user delete it', function(done) {
    const deleteCart = {
      item : idItem1
    }
    chai
      .request(app)
      .delete('/removeCart/'+cartId)
      .send(deleteCart)
      .set('token', custToken)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        done()
      })
  })

  it('cust back add to cart because cust want to checkout', function(done) {
    const cartUser = {
      item : idItem1,
      quantity : 2
    }
    chai
      .request(app)
      .post('/addToCart')
      .send(cartUser)
      .set('token', custToken)
      .end(function(err, res) {
        cartId = res.body.cart._id
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        done()
      })
  })

  it('customer back add another cart because customer wants to buy another item', function(done) {
    const cartUser = {
      item : idItem2,
      quantity : 1
    }
    chai
      .request(app)
      .post('/addToCart')
      .send(cartUser)
      .set('token', custToken)
      .end(function(err, res) {
        cartId = res.body.cart._id
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        done()
      })
  })

  it('customer can update the item because the item already out of stock', function(done) {
    const cartUser = {
      item : idItem2,
      quantity : 90
    }
    chai
      .request(app)
      .post('/addToCart')
      .send(cartUser)
      .set('token', custToken)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body.err).to.equal('out of stock')
        done()
      })
  })

  it('cust wants to checkout all the cart ', function(done) {
    chai
      .request(app)
      .post('/checkout')
      .set('token', custToken)
      .end(function(err, res) {
        transactionId = res.body._id
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res).to.have.nested.property('body')
        .that.includes.all.keys(['_id', 'CartId', 'totalPrice', 'status', 'UserId', 'created_at', 'updated_at'])
        expect(res.body.CartId).to.have.be.an('array')
        done()
      })
  })

  it('customer want to set pay the transaction and return a status 200 because updating the transaction status into paid', function(done) {
    chai
      .request(app)
      .patch('/transaction/'+transactionId+'/paid')
      .set('token', custToken)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.have.nested.property('body')
        .that.includes.all.keys(['_id', 'CartId', 'totalPrice', 'status', 'UserId', 'created_at', 'updated_at'])
        expect(res.body.CartId).to.have.be.an('array')
        done()
      })
  })

  it('customer confirmed the trasaction because the items is arrived and get status 200 because updating the transaction status', function(done) {
    chai
      .request(app)
      .patch('/transaction/'+transactionId+'/confirmed')
      .set('token', custToken)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.have.nested.property('body')
        .that.includes.all.keys(['_id', 'CartId', 'totalPrice', 'status', 'UserId', 'created_at', 'updated_at'])
        expect(res.body.CartId).to.have.be.an('array')
        done()
      })
  })

})

