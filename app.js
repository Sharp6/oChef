var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

if(app.get('env') === "development") {
  require('dotenv').load();
  console.log("Loading dotEnv.");
}


// Mongoose ODM
var mongoose = require('mongoose');
mongoose.connect('mongodb://philip:rabarber@ds037551.mongolab.com:37551/ochef');

var Ingredient = require('./models/ingredient.model.server')(mongoose);
var ingredientDA = require('./da/ingredient.da.server')(Ingredient);
var ingredientCtrl = require('./controllers/ingredient.controller.server')(Ingredient, ingredientDA);
var ingredientRoutes = require('./routes/ingredient.routes')(ingredientCtrl);


var gerechtRoutes = require('./routes/gerecht.routes');
var maaltijdRoutes = require('./routes/maaltijd.routes');
var homeRoutes = require('./routes/home.routes');

var Maaltijd = require('./models/maaltijd.model.server')(mongoose);
var maaltijdDA = require('./da/maaltijd.da.server')(Maaltijd);
var maaltijdCtrl = require('./controllers/maaltijd.controller.server')(Maaltijd, maaltijdDA);
var maaltijdRoutes = require('./routes/maaltijd.routes')(maaltijdCtrl);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ingredientRoutes);
app.use('/', gerechtRoutes);
app.use('/', maaltijdRoutes);
app.use('/', homeRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
