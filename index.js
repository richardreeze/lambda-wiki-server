const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const cookieSession = require('cookie-session');

require('./services/passport')(passport);
require('./models/User');

mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app, passport);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets (main.js, main.css, etc...)
  app.use(express.static('client/build'));

  // Express will serve up index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT);
console.log('The magic happens on port ' + PORT);
