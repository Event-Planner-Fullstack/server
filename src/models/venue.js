'use strict';

const venueModel = (sequelize, DataTypes) => sequelize.define('Venue', {
  item: { type: DataTypes.STRING, required: true },
  vendor_id: { type: DataTypes.NUMBER, required: true },
  venueName: { type: DataTypes.STRING, required: true },
  location: { type: DataTypes.STRING, required: true },
  hours: { type: DataTypes.STRING, required: true },
  imgUrl: { type: DataTypes.STRING, required: true },
  pocName: { type: DataTypes.STRING, required: true },
  pocNumber: { type: DataTypes.STRING, required: true },
  security: { type: DataTypes.BOOLEAN, required: true },
  cater: { type: DataTypes.BOOLEAN, required: true },
  maxCapacityInt: { type: DataTypes.NUMBER, required: true },
});

module.exports = venueModel;