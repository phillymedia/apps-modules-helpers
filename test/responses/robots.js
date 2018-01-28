/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { handleRobots } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import { expect } from "chai";


// METHODS
// =============================================================================

/**
 * Test the prepSuccess method - data.
 *
 * @param {function} done
 * @return {function}
 */
function robotsStatus(done) {
  // mock a request
  const { request, response } = this;
  // call send success
  handleRobots(request, response);
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
  // make error
  describe("Handle Robots", () => {
    context("when a robot visits", () => {
      // it("sendData should have success property", handleRobotsTest.data);
      it("should return 200", robotsStatus);
    });
  });
}


// EXPORT
// =============================================================================

export default tests;
