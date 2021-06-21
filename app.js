var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session');
const session  = require('express-session');
const userMiddleware = require('./middlewares/user');
const db = require('./models/db');
const cors = require('cors');
const User = require('./models/user');
const config = require('./config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  User.findByPk(obj.id).then(function(err,user){
    done(null, obj);
  }).catch(done);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url,
    profileFields: ['id', 'emails', 'name', 'displayName'],
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({where: {facebookId:profile.id}}).then(async function (user){
      if(!user){
        user = await User.create({
          Name: profile.displayName,
          facebookId : profile.id,
          Email:profile.emails[0].value,
        });
      }
      console.log(profile);
      done(null,user);
  }).catch(done);
}
));
//google
passport.use(
  new GoogleStrategy({
      clientID: config.google_clientID,
      clientSecret: config.google_clientSecret,
      callbackURL: config.googlecallback_url,
      profileFields: ['id', 'emails', 'name', 'displayName'],
    },
    async (accessToken, refreshToken, profile, done) => {
    //   const existingUser = await User.findOne({googleId: profile.id});

    //   if (existingUser) {
    //     return done(null, existingUser);
    //   }

    //   const user = await new User({
    //     googleId: profile.id,
    //     email: profile.emails[0].value,
    //     name: profile.name.familyName + ' ' + profile.name.givenName
    //   }).save();

    //   done(null, user);
    // })
    User.findOne({where: {googleId: profile.id}}).then(async function (user){
      if(!user){
        user = await User.create({
          Name: profile.name.familyName + ' ' + profile.name.givenName,
          googleId : profile.id,
          Email:profile.emails[0].value,
        });
      }
      console.log(profile);
      done(null,user);
  }).catch(done);
}));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
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
