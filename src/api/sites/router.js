const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const SITES_SCHEMA = require("./schema");

module.exports = function(app, controller) {
  router.get("/", controller.fetchAll);

  router.get(
    "/:id",
    celebrate({
      params: Joi.object().keys({
        id: SITES_SCHEMA.ID.required()
      })
    }),
    controller.fetchById
  );

  app.use("/sites", router);
};
