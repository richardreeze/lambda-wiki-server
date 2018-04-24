const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    session: true,
    passReqToCallback : true
  },

    (req, email, password, done) => {
        User.findOne({ 'email' : email}, (err, user) => {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, false);
          } else {
            const newUser = new User();
            newUser.name = req.body.name;
            newUser.email = email;
            newUser.password = password;

            newUser.save((err) => {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
    })
  );

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
    (req, email, password, done) => {
      User.findOne({ 'email' : email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  )
};
