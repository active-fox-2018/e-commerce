const models = require('../models')
const mongoose = require('mongoose')
require('dotenv').config()

let mongodb_srv = process.env.MONGODB_SRV || 'mongodb://localhost/h8-p2-portocombo1'
mongoose.connect(mongodb_srv, { useNewUrlParser: true })
/*models.Product.deleteMany({})
    .then(data => {
        console.log('Deleted all product data')
    }).catch(console.log)*/

for (let index = 0; index < 50; index++) {
    models.Product.create({
        name: 'Product ' + index,
        description: 'Product description ' + index,
        price: index,
    })
        .then(data => {
            console.log('Added ' + data.name)
        })
}
