/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

// dependencies
import { sendSuccess } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import chai from "chai";
// http plugin
chai.use(require("chai-http"));
// expect
const { expect } = chai;


// MAIN METHODS
// =============================================================================

/**
 * Test the sendSuccess method.
 *
 * @param {function} done
 * @return {function}
 */
function successHeaders(done) {
  // mock a request
  const { request, response } = this;
  // call send success
  sendSuccess(request, response);
  // console.log(response);
  expect(response).to.have.header("content-type", /json/);
  done();
}

/**
 * Test the sendSuccess method.
 *
 * @param {function} done
 * @return {function}
 */
function successStatus(done) {
  // mock a request
  const { request, response } = this;
  // call send success
  sendSuccess(request, response);
  expect(response.statusCode).to.equal(200);
  done();
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 */
function tests() {
  beforeEach(function () {
    this.request = new MockExpressRequest({
      method: "GET",
      url: "/anything",
    });
    this.response = new MockExpressReponse();
  });
  // send success
  describe("Send Success", () => {
    context("when no data sent data", () => {
      it("should have correct headers", successHeaders);
      it("should return 200", successStatus);
    });
  });
}


// EXPORT
// =============================================================================

export default tests;
