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
    clientSecret : authorizeFacebook.facebookAuth.clientSecret,
    callbackURL : authorizeFacebook.facebookAuth.callbackURL,
    // passReqToCallback : true,
    profileFields: ['id', 'email', 'name'] 

  },
    (token, refreshToken, profile, done) => {
      console.log("this is profile before nextTick", profile);
      process.nextTick(function() {
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err) 
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            return User.create({
              facebook: {
                id: profile.id,
                token: token,
                name: profile.name.givenName + ' ' + profile.name.familyName,
                email: profile.emails[0].value
              }
            }).then(user => {
              const created = user.toObject();
              delete created.password;
              res.status(201).json(created);
            })
            .catch(error => {
              res
                .status(500)
                .type('json')
                .json({ error });
            });
          });
            // var newUser = new User();
            // newUser.facebook = {};
            // console.log("This is profile", profile);
            // newUser.facebook.id = profile.id;
            // newUser.facebook.token = token;
            // newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; 
            // newUser.facebook.email = profile.emails[0].value;

            // newUser.save(function(err) {
            //   if (err)
            //     throw err;
            //   return done(null, newUser);
            // });
          }
        });
      });
  }));
};

