'use strict';

const { Sequelize, DataTypes } = require('sequelize');
// const venueModel = require('./venue.js');
// const eventModel = require('./event.js');
// const Collection = require('../Collection.js');

const userSchema = require('./user.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory';

const sequelize = new Sequelize(DATABASE_URL);
// const venue = venueModel(sequelize, DataTypes);
// const event = eventModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  // venue: new Collection(venue),
  // event: new Collection(event),
  users: userSchema(sequelize, DataTypes),
};