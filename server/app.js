const express = require('express');
const cors = require('cors')
const indexRoute = require('./routes/index')
const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/e-commerce-${NODE_ENV}`, { useNewUrlParser : true } );

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute)

app.listen(port, function() {
  console.log('this is listening to port 3000')
})

module.exports = app