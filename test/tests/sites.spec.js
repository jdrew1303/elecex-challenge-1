/* eslint-env mocha */
/* eslint-env chai */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */

"use strict";

const expect = require("chai").expect;

const httpClient = require("../util/httpClient");
const Database = require("../../src/lib/Database");

describe("/sites", function() {
  beforeEach("DB Setup", function() {
    const database = new Database();
    return database.init();
  });

  describe("GET /sites/:id", function() {
    // it's probably better here to check the shape of the returned data instead
    // of the values. This would help to avoid issues with the data changing. The
    // exception to this would be calculations or where you can cross reference
    // values (in this case the siteId would be an example). Joi can be handy in
    // this case for creating complex matchers.
    it("returns a single site with related devices object", function() {
      return httpClient
        .get("http://localhost:3000/sites/1")
        .then(fullResponse => {
          expect(fullResponse.statusCode).to.equal(200);
          const site = fullResponse.body;
          expect(site).to.be.an("object");
          expect(site.name).to.equal("Site 1");

          const { devices } = site;
          expect(devices).to.be.an("array");
          expect(devices.length).to.equal(2);

          expect(devices[0].name).to.equal("Device 1");
          expect(devices[0].active).to.equal(true);
          expect(devices[1].name).to.equal("Device 2");
          expect(devices[1].active).to.equal(false);
        });
    });
  });
});
