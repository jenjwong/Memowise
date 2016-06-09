import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from './models/User';

import authorizeFacebook from './config/authorizeFacebook.js';

const oid = '_id';

export default () => {
  // Serialize sessions
  passport.serializeUser((user, done) => done(null, user[oid]));

  // Deserialize sessions
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id,
    }, '-password', (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    (email, password, done) => {
      User.findOne({
        email,
      },
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'User not found',
          });
        }
        return user.authenticate(password, (error, isMatch) => {
          if (!isMatch) {
            return done(null, false, {
              message: 'Incorrect password',
            });
          }
          return done(null, { _id: user[oid], name: user.name, email: user.email });
        });
      });
    }));

  passport.use(new FacebookStrategy({
    
    clientID : authorizeFacebook.facebookAuth.clientID,
    clientSecret    : authorizeFacebook.facebookAuth.clientSecret,
    callbackURL     : authorizeFacebook.facebookAuth.callbackURL

  },
  (token, refreshToken, profile, done) => {
      console.log("Got something back from Facebook outside of function");

    process.nextTick(function() {
      console.log("Got something back from Facebook");
      
    });
  }));
}

