'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    role: { type: DataTypes.ENUM(['vendor', 'client', 'guest', 'admin']), required: true, defaultValue: 'user'},
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          // vendors can do all CRUD to venue, and read and update from events
          vendor: ['rVenue', 'cVenue', 'uVenue', 'dVenue', 'rEvents', 'uEvents'],

          // clients can do all CRUD to events and guests, they can only read from venues
          client: ['rEvent', 'cEvent', 'uEvent', 'dEvent', 'rVenue', 'rGuest', 'cGuest', 'uGuest', 'dGuest'],

          // guests can only create a guest
          guest: ['cGuest'],

          // admin have all the rights
          admin: ['all'],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({where: { username: parsedToken.username } });
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;