const boom = require("@hapi/boom");
const R = require("ramda");
const isEmptyOrUndefined = R.either(R.isNil, R.isEmpty);

module.exports = SitesModel => {
  return {
    fetchById: (req, res, next) => {
      const { id } = req.params;
      return SitesModel.getById(id)
        .then(d =>
          isEmptyOrUndefined(d)
            ? next(boom.notFound("Device not found", { id }))
            : res.status(200).json(d)
        )
        .catch(next);
    }
  };
};
