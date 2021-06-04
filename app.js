var createError = require('http-errors');
var express = require('express');
var path = require('path');
const expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cookieSession = require('cookie-session');
const movieauthRouter = require('./routes/movieauth');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userMiddleware = require('./middlewares/user');
const db = require('./models/db');
const cors = require('cors');
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(expressLayouts);
// app.use('/movies',movieauthRouter);
app.use('/user',userRouter); 
app.use('/profile',authRouter);
// app.use(CineplexRouter);
// app.use(CinemaRouter);
// app.use(MovieRouter);
// app.use(ShowTimeRouter);
// app.use(BookingRouter);
// app.use(TicketRouter);



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
