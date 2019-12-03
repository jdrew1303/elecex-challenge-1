/* eslint-env mocha */
/* eslint-env chai */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */

"use strict";

const expect = require("chai").expect;

const httpClient = require("../util/httpClient");
const Database = require("../../src/lib/Database");

describe("/devices", function() {
  beforeEach("DB Setup", function() {
    const database = new Database();
    return database.init();
  });

  describe("GET /devices", function() {
    it("GET /devices should return an array of device objects", function() {
      return httpClient
        .get("http://localhost:3000/devices")
        .then(fullResponse => {
          expect(fullResponse.statusCode).to.equal(200);
          const devices = fullResponse.body;
          expect(devices).to.be.an("array");
          expect(devices[0].name).to.equal("Device 1");
        });
    });
  });

  describe("GET /devices/:id", function() {
    it("GET /devices/:id should return a single device object", function() {
      return httpClient
        .get("http://localhost:3000/devices/1")
        .then(fullResponse => {
          expect(fullResponse.statusCode).to.equal(200);
          const device = fullResponse.body;
          expect(device).to.be.an("object");
          expect(device.name).to.equal("Device 1");
        });
    });
  });

  describe("POST /devices", function() {
    it("POST /devices should create a new device and return it", function() {
      const newDevice = {
        siteId: 1,
        name: "Device 4",
        active: false
      };
      return httpClient
        .post("http://localhost:3000/devices", newDevice)
        .then(fullResponse => {
          const device = fullResponse.body;
          expect(device).to.be.an("object");
          expect(device.name).to.equal("Device 4");
        });
    });
  });
});
