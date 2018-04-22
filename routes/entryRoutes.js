const isAuth = require('../services/checkSession');

module.exports = (app) => {
  app.get('/', isAuth, (req, res, next) => {
    res.send({message: 'testing'});
  });
}