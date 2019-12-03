const router = require("./router");
const controller = require("./controller");

module.exports = function(app, SiteModel) {
  router(app, controller(SiteModel));
};
