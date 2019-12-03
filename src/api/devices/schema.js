const { Joi } = require("celebrate");

const DEVICE_SCHEMA = {
  ID: Joi.number().min(1),
  NAME: Joi.string()
    .min(1)
    .max(2147483647),
  ACTIVE: Joi.boolean()
};

module.exports = DEVICE_SCHEMA;
