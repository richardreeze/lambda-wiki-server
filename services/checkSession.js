const isAuth = (req, res, next) => {
  // console.log('authcheck: ', req.user);
  if(req.isAuthenticated()) {
      next();
  } else {
      res.status(401).json({ message: 'You are not logged in.' });
  }
};

module.exports = isAuth;