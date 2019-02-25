require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const productRoute = require('./routes/product')
const userRoute = require('./routes/user')
const transactionRoute = require('./routes/transaction')
const adminRoute = require('./routes/admin')
const cors = require('cors')

const PORT = 3000
const environment = process.env.NODE_ENV || 'development'

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect(`${process.env.DATABASE}`,  { useNewUrlParser: true, useCreateIndex: true});

app.use('/users', userRoute)

app.use('/admin', adminRoute)

app.use('/products', productRoute)

app.use('/transactions', transactionRoute)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})
module.exports = app