var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

var indexRouter = require('./routes/index');

var app = express();

app.use(cors())

const status = process.env.NODE_ENV || 'development'
// const url = `mongodb://localhost:27017/eCommerce-${status}`
const url = `mongodb://localhost:27017/relictstore`
mongoose.connect(url, { useNewUrlParser: true })
.then(()=>{console.log("connected")},
  err =>{console.log("err",err);}
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
