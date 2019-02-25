const User = require('../models/user');
const Product = require('../models/product')
const Cart = require('../models/cart')

module.exports = {
    clearUser : function(done){
        User
            .deleteMany({})
            .then(function(){
                done()
            })
            .catch(function(err){
                console.log(err)
            })
    },
    clearProduct : function(done){
        Product
            .deleteMany({})
            .then(function(){
                done()
            })
            .catch(function(err){
                console.log(err)
            })
    },
    clearCart : function(done){
        Cart
            .deleteMany({})
            .then(function(){
                done()
            })
            .catch(function(err){
                console.log(err)
            })
    }
}
