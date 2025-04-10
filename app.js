/**
 * @fileoverview Main application file for MyApp.
 * Sets up the Express application, middleware, routes, and Swagger API documentation.
 * 
 * @requires http-errors
 * @requires express
 * @requires path
 * @requires cookie-parser
 * @requires morgan
 * @requires swagger-ui-express
 * @requires swagger-jsdoc
 * 
 * @requires ./routes/index
 * @requires ./routes/users
 * @requires ./routes/products
 * @requires ./routes/productype
 * @requires ./routes/gym
 * @requires ./routes/trainer
 * @requires ./routes/equipment
 * @requires ./routes/subscription
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var productypeRouter = require('./routes/productype');
var gymRouter = require('./routes/gym');
var trainerRouter = require('./routes/trainer');
var equipmentRouter = require('./routes/equipment');
var subscriptionRouter = require('./routes/subscription');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

var app = express();

// Swagger setup

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyApp API Documentation',
      version: '1.0.0',
      description: 'API documentation for MyApp',
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/productype', productypeRouter);
app.use('/gym', gymRouter);
app.use('/trainer', trainerRouter);
app.use('/equipment', equipmentRouter);
app.use('/subscription', subscriptionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
