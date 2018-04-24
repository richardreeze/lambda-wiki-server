const isAuth = require('../services/checkSession');

module.exports = (app) => {
  app.get('/category/:category', (req, res, next) => {
    res.send({message: 'testing'});
  });
}