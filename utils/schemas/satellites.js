const joi = require('@hapi/joi');

const satellitesSchema = joi.array().length(3);
const satelliteDistanceSchema = joi.number();
const satelliteMessageSchema = joi.array();

const getDistanceAndMessageSchema = {
  satellites: satellitesSchema.required(),
};

const updateSatelliteSchema = {
  distance: satelliteDistanceSchema.required(),
  message: satelliteMessageSchema.required(),
};

module.exports = {
  getDistanceAndMessageSchema,
  updateSatelliteSchema,
};
