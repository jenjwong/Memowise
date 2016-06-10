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
    console.log('Hi im in dcereal');
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
        console.log('Next tick function');
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          console.log('CREATED');
          if (err) {
            console.log('There is an error', err);
            return done(err);
          }
            
          if (user) {
            console.log('I EXIST', user);
            return done(null, user);
          } else {
            console.log('STARTED TO CREATE THE USER');
            return User.create({
              name: profile.name.givenName + ' ' + profile.name.familyName,
              email: profile.emails[0].value,
              password: 'thisiforfacebooklogin',
              facebook: {
                id: profile.id,
                token: token
              }
            }).then(user => {
              const created = user.toObject();
              console.log('CREATE THIS', user);
              delete created.password;
              return done(null, created);
            })
            .catch(error => {
              console.log('THERE IS AN ERROR', error);
              return done(error);
            });
          };
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
        );
      });
  }));
};

