const boom = require("@hapi/boom");

module.exports = (err, req, res, next) => {
  if (boom.isBoom(err)) next(err);

  // we return additional data and stack if we are in a development environment
  const internalError =
    process.env.NODE_ENV !== "production" && (err.stack || err.message)
      ? boom.internal(err.message, { stack: err.stack })
      : boom.internal("An internal server error occurred.");
  next(internalError);
};
