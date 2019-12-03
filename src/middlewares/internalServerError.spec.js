const chai = require("chai");
const should = chai.should();

const boom = require("@hapi/boom");
const internalServerError = require("./internalServerError");

describe("internal server error middleware", () => {
  it("creates a boom error from a standard error", done => {
    const next = err => {
      should.exist(err);
      boom.isBoom(err).should.be.true;
      err.isServer.should.be.true;
      done();
    };

    const exampleError = new Error();
    internalServerError(exampleError, {}, {}, next);
  });

  it("skips boom errors", done => {
    const next = err => {
      should.exist(err);
      boom.isBoom(err).should.be.true;
      err.isServer.should.be.false;
      done();
    };

    const exampleError = boom.badRequest("invalid query");
    internalServerError(exampleError, {}, {}, next);
  });
});
