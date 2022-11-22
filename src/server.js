'use strict';

const express = require('express');
const cors = require('cors');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./../src/auth/middleware/logger');

const authRoutes = require('./../src/routes/authRouter');
const venueRoutes = require('./../src/routes/venueRouter');
const eventRoutes = require('./../src/routes/eventRouter');
const guestRoutes = require('./../src/routes/guestRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use(authRoutes);
app.use(venueRoutes);
app.use(eventRoutes);
app.use(guestRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};