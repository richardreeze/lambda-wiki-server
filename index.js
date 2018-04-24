const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
let node_acl = require('acl');

// const setupAcl = require('./services/acl');
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
  const acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, 'acl_'));

  acl.allow([
    {
      roles: 'admin',
      allows: [
        { resources: '/test-secret', permissions: '*' }
      ]
    },
    {
      roles: 'user',
      allows: [
        { resources: ['/profile', '/status'], permissions: '*' }
      ]
    },
    {
      roles: 'guest',
      allows: []
    }
  ]);
  acl.addRoleParents('user', 'guest');
  acl.addRoleParents('admin', 'user');
  // acl.addUserRoles('5adc5d9dd90ce329ecea6db5', 'admin');

  require('./routes/authRoutes')(app, passport);
  require('./routes/entryRoutes')(app, acl);
  require('./routes/userRoutes')(app, acl);
});


require('./models/User');

// if (process.env.NODE_ENV === 'production') {
//   // Express will serve up production assets (main.js, main.css, etc...)
//   app.use(express.static('client/build'));

//   // Express will serve up index.html file if it doesn't recognize the route
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.listen(PORT);
console.log('The magic happens on port ' + PORT);

// module.exports = acl;