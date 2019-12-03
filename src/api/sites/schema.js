const { Joi } = require("celebrate");

const SITES_SCHEMA = {
  ID: Joi.number().min(1),
  NAME: Joi.string()
    .min(1)
    .max(2147483647)
};

module.exports = SITES_SCHEMA;
