var express       = require('express');
var app           = express();
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var session       = require('express-session');
var multer        = require('multer');
var upload        = multer({ dest: 'public/uploads/'});

/* DB */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/clueless', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('as if...');
    }
});

var routes  = require('./routes/routes');
var items   = require('./routes/items');
var outfits = require('./routes/outfits');
var closets = require('./routes/closets');
var types   = require('./routes/types');
var tags    = require('./routes/tags');

/* IMG-upload */
app.use(multer({dest: 'public/uploads'}));

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* PASSPORT */
require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'YouseehowpickyIamaboutmyshoesandtheyonlygoonmyfeet' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use('/routes', routes);
app.use('/items', items);
app.use('/outfits', outfits);
app.use('/closets', closets);
app.use('/types', types);
app.use('/tags', tags);

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
