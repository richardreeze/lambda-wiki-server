const isAuth = require('../services/checkSession');


// const get_user_id = (req) => {
//   return req.user && req.user._id.toString() || false;
// };

module.exports = (app, acl) => {
  app.get('/status', isAuth, (req, res, next) => {
    acl.userRoles(req.user._id.toString())
    .then(role => {
      res.json({ user: { _id: req.user.id }, roles: role });
    })
    .catch(err => {
      res.status(422).json({ error: err });
    });
  });

  app.get('/test-secret', [isAuth, acl.middleware(1)], (req, res, next) => {
    res.json({message: 'aye this the secret shit'});
  });

  app.post('/promote/:user/:role', [isAuth, acl.middleware(1)], (req, res, next) => {
    acl.addUserRoles(req.params.user, req.params.role);
    res.json({ message: `${req.params.user} is now a ${req.params.role}` });
  });

  app.post('/demote/:user/:role', [isAuth, acl.middleware(1)], (req, res, next) => {
    acl.removeUserRoles(req.params.user, req.params.role);
    res.json({ message: `${req.params.user} is no longer a ${req.params.role}` });
  });
}