const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const should = chai.should();
chai.use(sinonChai);

const boom = require("@hapi/boom");
const devicesController = require("./controller");

const stubResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe("devices api controller", () => {
  describe("fetch all", () => {
    it("fetches a list of devices successfully", done => {
      const DeviceModel = {
        getAll: sinon.stub().resolves([])
      };

      const controller = devicesController(DeviceModel);

      const req = {
        params: {},
        query: {},
        body: {}
      };
      const res = stubResponse();
      const next = err => {
        should.not.exist(err);
      };

      controller.fetchAll(req, res, next).then(() => {
        DeviceModel.getAll.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        done();
      });
    });

    it("can filter all devices based on activity status", done => {
      const DeviceModel = {
        getAllByActivityStatus: sinon.stub().resolves([])
      };

      const controller = devicesController(DeviceModel);

      const req = {
        params: {},
        query: { active: true },
        body: {}
      };
      const res = stubResponse();
      const next = err => {
        should.not.exist(err);
      };

      controller.fetchAll(req, res, next).then(() => {
        DeviceModel.getAllByActivityStatus.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        done();
      });
    });
  });

  describe("fetch a device by id", () => {
    it("fetches a device by id", done => {
      const device = {
        id: 1,
        name: "demo device"
      };

      const DeviceModel = {
        getById: sinon.stub().resolves(device)
      };

      const controller = devicesController(DeviceModel);

      const req = {
        params: { id: 1 },
        query: {},
        body: {}
      };
      const res = stubResponse();
      const next = err => {
        should.not.exist(err);
      };

      controller.fetchById(req, res, next).then(() => {
        DeviceModel.getById.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        done();
      });
    });

    it("returns a 404 not found error if the device cannot be found", done => {
      const site = {};

      const DeviceModel = {
        getById: sinon.stub().resolves(site)
      };

      const controller = devicesController(DeviceModel);

      const req = {
        params: { id: 1 },
        query: {},
        body: {}
      };
      const res = stubResponse();
      const next = err => {
        should.exist(err);
        boom.isBoom(err).should.be.true;
        err.output.payload.statusCode.should.equal(404);
        DeviceModel.getById.should.have.been.calledOnce;
        done();
      };

      controller.fetchById(req, res, next);
    });
  });

  describe("creates a new device", () => {
    it("creates and responds with the created device", done => {
      const device = {
        name: "demo device",
        siteId: 1,
        active: true
      };

      const DeviceModel = {
        create: sinon.stub().resolves({ id: 1, ...device })
      };

      const controller = devicesController(DeviceModel);

      const req = {
        params: { id: 1 },
        query: {},
        body: device
      };
      const res = stubResponse();
      const next = err => {
        should.not.exist(err);
      };

      controller.create(req, res, next).then(() => {
        DeviceModel.create.should.have.been.calledWith(device);
        res.status.should.have.been.calledWith(201);
        done();
      });
    });
  });
});
