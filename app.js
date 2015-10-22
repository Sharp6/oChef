// POLYFILL

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');

var Busboy = require('busboy');
var Grid = require("gridfs-stream");

var app = express();

if(app.get('env') === "development") {
  require('dotenv').load();
  console.log("Loading dotEnv.");
}

console.log("environment", app.get('env'));

// Mongoose ODM
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECT_STRING);
var mongodb = mongoose.connection;
// GRID FS
var gfs = Grid(mongodb.db, mongoose.mongo);

var authRoutes = require('./routes/auth.routes');

var Ingredient = require('./models/ingredient.model.server')(mongoose);
var ingredientDA = require('./da/ingredient.da.server')(Ingredient);
var ingredientCtrl = require('./controllers/ingredient.controller.server')(Ingredient, ingredientDA);
var ingredientRoutes = require('./routes/ingredient.routes')(ingredientCtrl);

var Gerecht = require('./models/gerecht.model.server')(mongoose, Ingredient);
var gerechtDA = require('./da/gerecht.da.server')(Gerecht, gfs);
var gerechtCtrl = require('./controllers/gerecht.controller.server')(Gerecht, gerechtDA, Busboy);
var gerechtRoutes = require('./routes/gerecht.routes')(gerechtCtrl);

var Maaltijd = require('./models/maaltijd.model.server')(mongoose);
var maaltijdDA = require('./da/maaltijd.da.server')(Maaltijd);
var maaltijdCtrl = require('./controllers/maaltijd.controller.server')(Maaltijd, maaltijdDA);
var maaltijdRoutes = require('./routes/maaltijd.routes')(maaltijdCtrl);

var mainCtrl = require('./controllers/main.controller.server')();

var homeRoutes = require('./routes/home.routes')(mainCtrl);
var userRoutes = require('./routes/users.routes')(mainCtrl);

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

var User = require('./models/user.model.server')(mongoose);
app.use(session({secret: 'oChefSession'}));
require('./config/passport')(app, User);




app.use('/users', userRoutes);
app.use('/auth', authRoutes);
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
