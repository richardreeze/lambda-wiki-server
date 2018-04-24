const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const setupACL = require('./services/acl');
const keys = require('./config/keys');

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

mongoose.connect(keys.mongoURI);
app.use(cors(corsOptions));
app.options('*', cors());
app.use(helmet());
const cookieSession = require('cookie-session');

require('./services/passport')(passport);

const expire = new Date(Date.now() + 60 * 60 * 1000);
app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    cookie: {
      secure: true,
      httpOnly: true,
      // domain
      // path
      expires: expire,
    }
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connection.on('connected', () => {
  const acl = setupACL(mongoose.connection.db);
  require('./routes/authRoutes')(app, passport);
  require('./routes/userRoutes')(app, acl);
  require('./routes/entryRoutes')(app, acl);
});

app.listen(PORT);
console.log('The magic happens on port ' + PORT);
