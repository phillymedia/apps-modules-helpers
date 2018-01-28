/* eslint-disable prefer-arrow-callbacks */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
import { cloneDeep } from "lodash";
// TESTED METHODS -------------------------------
import {
  standardizeInput,
  getInputDevicePublish,
} from "MAIN";
// chai
import { expect } from "chai";
// express request/response mocking
import MockExpressRequest from "mock-express-request";
import MockExpressReponse from "mock-express-response";


// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

const testing = {};
testing.philly = {
  userAgent: "_PhillyCom_iOSClient",
  articleId: 471547204,
  target: "phillycom",
  message: "Liftoff! The Eagles are bound for Minnesota - and the Super Bowl",
  deviceToken: "de4893e26ebf9c9b2d7f3d0176dd1b4185377e36f2800d3a3c2c80940fb95ccd",
};
testing.sports = {
  userAgent: "_SportsCombo_iOSClient",
  articleId: 471339934,
  target: "football",
  topics: {
    "_app-Basketball_iOS": true,
    "_app-Baseball_iOS": true,
    "_app-Football_iOS": false,
    "_app-Hockey_iOS": false,
    "_app-Soccer_iOS": true,
  },
  message: "In what could spell the end of his illustrious NHL career, Jaromir Jagr has been placed on waivers by the Calgary Flames.",
  deviceToken: "de4893e26ebf9c9b2d7f3d0176dd1b4185377e36f2800d3a3c2c80940fb95ccd",
};

// PROPERTIES
// =============================================================================

const testPhillyInputSettings = {
  method: "POST",
  body: {
    id: testing.philly.articleId,
    message: testing.philly.message,
    target: testing.philly.target,
  },
};
const testSportsInputSettings = cloneDeep(testPhillyInputSettings);
testSportsInputSettings.body.id = testing.sports.articleId;
testSportsInputSettings.body.message = testing.sports.message;
testSportsInputSettings.body.target = testing.sports.target;


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Test the getInputDevicePublish method - errors when no id.
 *
 * @param {function} done
 * @return {function}
 */
function hasErrorPhilly(done) {
  // get the request
  const { badRequest: request, response } = this;
  // test the method
  getInputDevicePublish(request, response, (err) => {
    expect(err).to.be.an("error").which.has.a.property("code").which.equals("MissingInput");
    done();
  });
}

/**
 * Test the getInputDevicePublish method (sports now) - errors when no id.
 *
 * @param {function} done
 * @return {function}
 */
function hasErrorSports(done) {
  // get the request
  const { badRequest: request, response } = this;
  // test the method
  getInputDevicePublish(request, response, (err) => {
    expect(err).to.be.an("error").which.has.a.property("code").which.equals("MissingInput");
    done();
  });
}

/**
 * Test the getInputDevicePublish method - working.
 *
 * @param {function} done
 * @return {function}
 */
function noErrorsPhilly(done) {
  // get the request
  const { request, response } = this;
  // test the method
  getInputDevicePublish(request, response, () => {
    expect(request.deviceMessage).to.equal(testing.philly.message);
    expect(request.id).to.equal(testing.philly.articleId);
    expect(request.termHints).to.be.an("array");
    expect(request.originalTarget).to.equal(testing.philly.target);
    done();
  });
}

/**
 * Test the getInputDevicePublish method (sports now) - working.
 *
 * @param {function} done
 * @return {function}
 */
function noErrorsSports(done) {
  // get the request
  const { request, response } = this;
  // test the method
  getInputDevicePublish(request, response, () => {
    expect(request.deviceMessage).to.equal(testing.sports.message);
    expect(request.id).to.equal(testing.sports.articleId);
    expect(request.termHints).to.be.an("array");
    expect(request.originalTarget).to.equal(testing.sports.target);
    done();
  });
}


// TESTS
// =============================================================================

/**
 * Feed test methods.
 *
 */
function tests() {
  // get input
  describe("Get Input", () => {
    // main
    describe("Publish", () => {
      describe("Philly.com", () => {
        // before each
        beforeEach(function (done) {
          // mock some requests
          this.request = new MockExpressRequest(testPhillyInputSettings);
          this.badRequest = new MockExpressRequest();
          // add input to bad request
          this.badRequest.input = {};
          // mock a response
          this.response = new MockExpressReponse();
          // call standardize input
          standardizeInput(this.request, this.response, done);
        });
        context("when no data sent", () => {
          it("should error", hasErrorPhilly);
        });
        context("when data sent", () => {
          it("should add correct data to the request", noErrorsPhilly);
        });
      });
      describe("Sports Now", () => {
        // before each
        beforeEach(function (done) {
          // mock some requests
          this.request = new MockExpressRequest(testSportsInputSettings);
          this.badRequest = new MockExpressRequest();
          // add input to bad request
          this.badRequest.input = {};
          // mock a response
          this.response = new MockExpressReponse();
          // call standardize input
          standardizeInput(this.request, this.response, done);
        });
        context("when no data sent", () => {
          it("should error", hasErrorSports);
        });
        context("when data sent", () => {
          it("should add correct data to the request", noErrorsSports);
        });
      });
    });
  });
}


// EXPORT
// =============================================================================

export default tests;
