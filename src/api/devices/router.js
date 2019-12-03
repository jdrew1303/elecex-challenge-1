const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const DEVICE_SCHEMA = require("./schema");

module.exports = function(app, controller) {
  router.get(
    "/",
    celebrate({
      query: Joi.object().keys({
        active: DEVICE_SCHEMA.ACTIVE
      })
    }),
    controller.fetchAll
  );
  router.get(
    "/:id",
    celebrate({
      params: Joi.object().keys({
        id: DEVICE_SCHEMA.ID.required()
      })
    }),
    controller.fetchById
  );
  router.post(
    "/",
    celebrate({
      body: Joi.object().keys({
        siteId: DEVICE_SCHEMA.ID.required(),
        name: DEVICE_SCHEMA.NAME.required(),
        active: DEVICE_SCHEMA.ACTIVE.required()
      })
    }),
    controller.create
  );

  router.delete(
    "/:id",
    celebrate({
      params: Joi.object().keys({
        id: DEVICE_SCHEMA.ID.required()
      })
    }),
    controller.delete
  );

  app.use("/devices", router);
};
