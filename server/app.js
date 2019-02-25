require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const NODE_ENV = process.env.NODE_ENV || 'development'

var indexRouter = require('./routes/index');

var app = express();
mongoose.connect(`mongodb://localhost:27017/E-commerce-${NODE_ENV}`, { useNewUrlParser: true })

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
