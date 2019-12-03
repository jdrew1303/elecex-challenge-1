const { errors } = require("celebrate");
const internalServerError = require("./internalServerError");
const serialiseBoomErrors = require("./serialiseBoomErrors");

module.exports = function(app) {
  app.use(errors);
  app.use(internalServerError);
  app.use(serialiseBoomErrors);
};
