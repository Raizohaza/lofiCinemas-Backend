var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passportConfig = require('./utils/loginFBGG');

const expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session');
const session  = require('express-session');
const userMiddleware = require('./middlewares/user');
const db = require('./models/db');
const cors = require('cors');
const User = require('./models/user');
// const config = require('./config/config');
const environment = process.env.NODE_ENV || 'development';

if(environment ==='development')
  require('dotenv').config({path: __dirname + '/.env'});
var app = express();

app.use(cors());
app.use(cookieSession({
  name: 'session',
  keys: [ process.env.COOKIE_KEY || 'secret'],
  maxAge: 24 * 60 * 60 * 1000,
}))

app.use(userMiddleware);
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passportConfig.initialize());
app.use(passportConfig.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use('/user',require('./routes/user')); 
app.use(require('./routes/showtime')); 
app.use(require('./routes/booking'));
app.use(require('./routes/cineplex'));
app.use(require('./routes/cinema'));
app.use(require('./routes/movie'));
app.use(require('./routes/ticket'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message,err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
