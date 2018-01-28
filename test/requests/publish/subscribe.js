/* eslint-disable prefer-arrow-callbacks */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// MOCKED METHODS -------------------------------
// import conf from "APP/config";
// import { stub } from "sinon";
// MOCKED CALLBACKS -------------------------------
import mocked from "./mocked";
// const mockedCallbacks = mocked.callbacks;
const mockedData = mocked.data;
import topics from "../topics";
const mockedTopicsData = topics.mocked.data;


// dependencies
import {
  standardizeInput,
  getInputDeviceHints,
  getInputDeviceSubscribe,
} from "MAIN";
// chai
import { expect } from "chai";
// express request/response mocking
const MockExpressRequest = require("mock-express-request");
const MockExpressReponse = require("mock-express-response");
import { sns as _sns } from "APP/config";
const { _hints } = _sns;
const [_hint] = _hints;


// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

// PROPERTIES
// =============================================================================

/**
 * The stubbed config object.
 *
 * @property MockHints
 */
let MockHints;

/**
 * The stubbed config value
 *
 * @property hints
 */
const hints = [
  {
    userAgent: mockedData.userAgent,
    appHint: mockedData.appHint,
    termHint: mockedTopicsData.termHint,
    targetHint: mockedData.targetHint,
  },
];

const testInputSettings = {
  method: "POST",
  headers: {
    "User-Agent": _hint.userAgent,
  },
  body: {
    deviceToken: "FakeDeviceToken",
    // userData: "",
    topic: "",
    // termHint: "",
    // appHint: "",
  },
};


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Test the getInputDeviceSubscribe method - errors when no id.
 *
 * @param {function} done
 * @return {function}
 */
function noErrors(done) {
  // get the request
  const { request, response } = this;
  // call test method
  getInputDeviceSubscribe(request, response, (err, data) => {
    console.log(err, data);
    // expect(request).to.have.property("search").that.equals(testInputSettings.body.search);
    return done();
  });
}


// TESTS
// =============================================================================

// get input
describe("Get Input", () => {
  // before each
  beforeEach(function (done) {
    // mock some requests
    this.request = new MockExpressRequest(testInputSettings);
    this.badRequest = new MockExpressRequest();
    // add input to bad request
    this.badRequest.input = {};
    // mock a response
    this.response = new MockExpressReponse();
    // call standardize input
    standardizeInput(this.request, this.response, (err) => {
      if (err) {
        return done(err);
      }
      // otherwise...
      return done();
    });
  });
  // before each #2
  beforeEach(function (done) {
    // call standardize input
    getInputDeviceHints(this.request, this.response, (err) => {
      if (err) {
        return done(err);
      }
      // otherwise...
      return done();
    });
  });
  // main
  describe("Subscribe", () => {
    context("when no data sent", () => {
      it("should error", noErrors);
    });
    context.skip("when data sent", () => {
      it("should not error", noErrors);
    });
  });
});
