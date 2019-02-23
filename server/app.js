const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.PORT || 3000
const DB = process.env.NODE_ENV || 'dev'

mongoose.connect(`mongodb://localhost/eCom-${DB}`, { useNewUrlParser: true })

//ROUTES
const userRoute = require('./routes/users')
const productRoute = require('./routes/products')
const cartRoute = require('./routes/carts')
const ongkirRoute = require('./routes/kingOngkir')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/carts', cartRoute)
app.use('/postal', ongkirRoute)

app.listen(port, () => {
    console.log(`App listening to port ${port}`)
})

module.exports = app