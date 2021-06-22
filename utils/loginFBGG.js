const User = require('../models/user');
const config = require('../config/config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const cookieSession = require('cookie-session');
const session  = require('express-session');

  
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

module.exports = passport;