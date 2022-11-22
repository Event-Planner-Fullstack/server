'use strict';

const guestModel = (sequelize, DataTypes) => sequelize.define('Guest', {
  item: { type: DataTypes.STRING, required: true },
  event_id: { type: DataTypes.NUMBER, required: true },
  name: { type: DataTypes.STRING, required: true, unique: true },
  email: { type: DataTypes.STRING, required: true, unique: true },
  inviteCode: { type: DataTypes.STRING, required: true },
});

module.exports = guestModel;