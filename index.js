'use strict';

const { db } = require('./src/models');
const server = require('./src/server');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  try {
    server.start(PORT);
  } catch(e) {
    console.log(e);
  }
});