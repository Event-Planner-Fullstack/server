'use strict';

const express = require('express');
const cors = require('cors');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./../src/auth/middleware/logger');

const authRoutes = require('./../src/routes/authRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};