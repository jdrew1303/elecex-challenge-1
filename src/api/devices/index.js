const router = require("./router");
const controller = require("./controller");

module.exports = function(app, DeviceModel) {
  router(app, controller(DeviceModel));
};
