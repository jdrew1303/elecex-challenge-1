const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const should = chai.should();
chai.use(sinonChai);

const boom = require("@hapi/boom");
const sitesController = require("./controller");

const stubResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe("sites api controller", () => {
  describe("fetch a site by id", () => {
    it("fetches a site by id", done => {
      const site = {
        id: 1,
        name: "demo site",
        devices: []
      };

      const SitesModel = {
        getById: sinon.stub().resolves(site)
      };

      const controller = sitesController(SitesModel);

      const req = {
        params: { id: 1 }
      };
      const res = stubResponse();
      const next = err => {
        should.not.exist(err);
      };

      controller.fetchById(req, res, next).then(() => {
        SitesModel.getById.should.have.been.calledOnce;
        res.status.should.have.been.calledWith(200);
        done();
      });
    });

    it("returns a 404 boom error if the site cannot be found", done => {
      const site = {};

      const SitesModel = {
        getById: sinon.stub().resolves(site)
      };

      const controller = sitesController(SitesModel);

      const req = {
        params: { id: 1 }
      };
      const res = stubResponse();
      const next = err => {
        should.exist(err);
        boom.isBoom(err).should.be.true;
        err.output.payload.statusCode.should.equal(404);
        SitesModel.getById.should.have.been.calledOnce;
        done();
      };

      controller.fetchById(req, res, next);
    });
  });
});
