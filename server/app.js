require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT
const cors = require('cors')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
mongoose.connect('mongodb://localhost/e-commerc', { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', indexRouter)

app.listen(port, () => {
    console.log('on port 3000')
})

module.exports = app