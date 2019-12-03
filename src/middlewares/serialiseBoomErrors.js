const boom = require("@hapi/boom");

module.exports = (err, req, res, next) => {
  if (boom.isBoom(err)) {
    return res.status(err.output.statusCode).json({
      ...err.output.payload,
      ...(err.data ? { data: err.data } : {})
    });
  }
  next(err);
};
