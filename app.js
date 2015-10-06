var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer({dest:'./public/uploads'});
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

var Ingredient = require('./models/ingredient.model.server')(mongoose);
var ingredientDA = require('./da/ingredient.da.server')(Ingredient);
var ingredientCtrl = require('./controllers/ingredient.controller.server')(Ingredient, ingredientDA);
var ingredientRoutes = require('./routes/ingredient.routes')(ingredientCtrl);

var Gerecht = require('./models/gerecht.model.server')(mongoose, Ingredient);
var gerechtDA = require('./da/gerecht.da.server')(Gerecht);
var gerechtCtrl = require('./controllers/gerecht.controller.server')(Gerecht, gerechtDA);
var gerechtRoutes = require('./routes/gerecht.routes')(gerechtCtrl);

var Maaltijd = require('./models/maaltijd.model.server')(mongoose);
var maaltijdDA = require('./da/maaltijd.da.server')(Maaltijd);
var maaltijdCtrl = require('./controllers/maaltijd.controller.server')(Maaltijd, maaltijdDA);
var maaltijdRoutes = require('./routes/maaltijd.routes')(maaltijdCtrl);

var homeRoutes = require('./routes/home.routes');


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


app.post('/uploads', function(req,res) {
  console.log("In the uploads route");

  var gfsStream;
  var busboy = new Busboy({headers: req.headers});

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log("Got file", filename);

    gfsStream = gfs.createWriteStream({
      filename: filename,
      mode: "w",
      chunkSize: 1024*256,
      content_type: mimetype,
      root: "fs",
      metadata: {}
    });

    file.on('data', function(data) {
      gfsStream.write(data);
    });

    file.on('end', function() {
      gfsStream.end();
    });

    gfsStream.on('close', function(file) {
      console.log("GFS stream is closed");
    });
  }); 

  busboy.on('error', function(err) {
    console.log(err);
    res.send(500, 'ERROR', err);
  });

  busboy.on('finish', function() {
    console.log("Busboy finish");
    res.send(200);
  });
  req.pipe(busboy);
});

app.get('/viewImg', function(req,res) {
  var readStream = gfs.createReadStream({
    _id : "5613dee6391f995e26106801"
  });

  readStream.on('error', function(err) {
    res.send('404', 'Not found');
    return;
  });

  res.setHeader('Content-Type', 'image/jpeg');
  readStream.pipe(res); 
});

/*
app.post('/uploads', upload.single('imgFile'), function(req,res,next) {
	console.log("In the uploads route");
	console.log("ContentType", req.get('content-type'));
	console.log(req);
	res.json("ok");
});
*/
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
