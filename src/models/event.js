'use strict';

const eventModel = (sequelize, DataTypes) => sequelize.define('Event', {
  item: { type: DataTypes.STRING, required: true },
  client_id: { type: DataTypes.NUMBER, required: true },
  venue_id: { type: DataTypes.NUMBER, required: true },
  vendor_id: { type: DataTypes.NUMBER, required: true },
  date: { type: DataTypes.DATE, required: true },
  pocName: { type: DataTypes.STRING, required: true },
  pocNumber: { type: DataTypes.STRING, required: true },
  requested: { type: DataTypes.BOOLEAN, required: true },
  confirmed: { type: DataTypes.BOOLEAN, required: true },
  security: { type: DataTypes.BOOLEAN, required: true },
  cater: { type: DataTypes.BOOLEAN, required: true },
  estimatedGuestCount: { type: DataTypes.NUMBER, required: true },
  guestList: { type: DataTypes.ARRAY(DataTypes.NUMBER), required: true },
});

module.exports = eventModel;