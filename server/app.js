require('dotenv').config();
const express = require('express');
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 3000;
const routes = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${NODE_ENV}`, { useNewUrlParser: true, useFindAndModify: false });


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', routes);

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;