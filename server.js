const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

// tell the app to look for static files in these directories
// app.use(express.static('./public'));
// app.use(express.static('./build'));
// app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static('./server/static/'));
app.use(express.static('./build'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignUpStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignUpStrategy);
passport.use('local-login', localLoginStrategy);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

// pass the authenticaiton checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth.js');
const apiRoutes = require('./server/routes/api.js');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.use(function (req, res) {
  res.status(404).send('Sorry cant find that!');
})

app.listen(4000, () => {
  console.log('Server is running on https://localhost:' + '4000')
})