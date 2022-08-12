var express = require('express');
var logger = require('morgan');
var path = require('path');
var createError = require('http-errors');
var booksRouter = require('./routes/books');

// Imports book model
const { sequelize } = require('./models');

// Instantiates server
var app = express();


// Configure pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Checking connection to database
app.use('/', booksRouter);
(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// 404 error handling
app.use((req, res, next) => {
  res.status = 404;
  res.render("page-not-found");
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send('Something broke!');
});

module.exports = app;