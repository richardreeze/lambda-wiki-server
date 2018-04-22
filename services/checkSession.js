const authUser = (req, res, next) => {
  console.log('authcheck: ', req.user);
  if(req.user) {
      next();
  } else {
      res.json({ message: 'You are not logged in.' });
  }
};

module.exports = authUser;