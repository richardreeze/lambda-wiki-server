const passport = require('passport');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.send('Hi there');
  });
}
