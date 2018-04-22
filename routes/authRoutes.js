const passport = require('passport');

module.exports = (app, passport) => {
  /*app.get('/', (req, res) => {
    res.send('Hi there');
  });*/

  /*app.get('/profile', (req, res) => {
    res.send('It works!');
  });*/

  app.post('/signup', passport.authenticate('local-signup'), (req, res, next) => {
    res.send({ success: true });
    next();
  });
  app.post('/login', passport.authenticate('local-login'), (req, res, next) => {
    res.send({ success: true });
    next();
  });
}
