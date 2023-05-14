const express = require('express');
require('dotenv').config();
require('express-async-errors');

const app = express();

// Startup Checks
// require('./config/startup')();

// Middleware
require('./config/middleware')(app);

// Routes
require('./config/routes')(app);

// Dev Error Handler & Logger
if (process.env.ENTORNO === 'desarrollo') {
  app.use(require('./middleware/devError'));
}

module.exports = app;
