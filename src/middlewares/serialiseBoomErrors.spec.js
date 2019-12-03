const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const should = chai.should();
chai.use(sinonChai);

const { Joi } = require("celebrate");
const boom = require("@hapi/boom");
const serialiseBoomErrors = require("./serialiseBoomErrors");

const stubResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe("serialise boom error middleware", () => {
  it("serialises boom errors", done => {
    const next = err => {};

    const res = stubResponse();
    const badRequest = boom.badRequest("invalid query");

    const response = serialiseBoomErrors(badRequest, {}, res, next);
    response.status.should.have.been.calledWith(badRequest.output.statusCode);

    done();
  });

  it("skips non boom errors", done => {
    const next = err => {
      should.exist(err);
      boom.isBoom(err).should.be.false;
      done();
    };

    serialiseBoomErrors(new Error(), {}, {}, next);
  });
});
