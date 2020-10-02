var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var OpenApiValidator = require('express-openapi-validator');
var swaggerUi = require('swagger-ui-express')
var bodyParser = require("body-parser");
var YAML = require('yamljs');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

var swaggerDocument = YAML.load('./api.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: './api.yaml'
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var usersRouter = require('./src/routes/users/users.route');
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
