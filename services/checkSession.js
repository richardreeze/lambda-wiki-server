const isAuth = (req, res, next) => {
  // console.log('authcheck: ', req.user);
  if(req.isAuthenticated()) {
    console.log('authenticated[]');
      next();
  } else {
      res.status(401).json({ message: 'You are not logged in.' });
  }
};

module.exports = isAuth;