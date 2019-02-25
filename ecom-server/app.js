const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
require('dotenv').config()
const uri = `mongodb://localhost:27017/`
var NODE_ENV = process.env.NODE_ENV || 'e_comerce_development'
mongoose.connect(`mongodb://localhost:27017/e_comerce_development`, { useNewUrlParser: true })
const cors = require('cors')

app.use(cors())

const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/carts', cartRoute)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

module.exports = app