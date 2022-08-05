var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {sequelize} =require('./models')

var usersRouter = require('./routes/users');

var app = express();


//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);


//Checking connection to database
try {
  db.sequelize.authenticate();
  console.log("Connected to database successfully");
} catch (error) {
  console.error("Connected to database failed", error);
}


//404 error handling
app.use(( req, res, next) => {
  res.status = 404;
  res.render("page-not-found");
  });

//Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send('Something broke!');
  })

module.exports = app;