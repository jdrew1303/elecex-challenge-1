const boom = require("@hapi/boom");
const R = require("ramda");
const isEmptyOrUndefined = R.either(R.isNil, R.isEmpty);

module.exports = DeviceModel => {
  return {
    fetchAll: (req, res, next) => {
      const hasFilterForActiveDevices = R.is(Boolean, req.query.active);
      const devices = hasFilterForActiveDevices
        ? DeviceModel.getAllByActivityStatus(req.query.active)
        : DeviceModel.getAll();
      return devices.then(d => res.status(200).json(d)).catch(next);
    },
    fetchById: (req, res, next) => {
      const { id } = req.params;
      return DeviceModel.getById(id)
        .then(d =>
          isEmptyOrUndefined(d)
            ? next(boom.notFound("Device not found", { id }))
            : res.status(200).json(d)
        )
        .catch(next);
    },
    create: (req, res, next) => {
      const { siteId, name, active } = req.body;
      return DeviceModel.create({ siteId, name, active })
        .then(d => res.status(201).json(d))
        .catch(next);
    },
    delete: (req, res, next) => {
      next(boom.notImplemented("deletion of a device is not yet implimented"));
    }
  };
};
