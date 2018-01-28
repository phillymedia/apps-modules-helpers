/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

// dependencies
import { prepSuccess } from "MAIN";
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
 * Test the prepSuccess method - data.
 *
 * @param {function} done
 * @return {function}
 */
function prepData(done) {
  // mock a request
  const { request, response } = this;
  // call send success
  prepSuccess(request, response, (err) => {
    expect(err).to.be.undefined;
    expect(response.sendData).to.have.property("success").that.is.true;
    done();
  });
}

/**
 * Test the prepSuccess method - status.
 *
 * @param {function} done
 * @return {function}
 */
function prepStatus(done) {
  // mock a request
  const { request, response } = this;
  // call send success
  prepSuccess(request, response, (err) => {
    expect(err).to.be.undefined;
    expect(response.statusCode).to.equal(200);
    done();
  });
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
  // prep success
  describe("Prep Success", () => {
    context("when no data sent", () => {
      it("sendData should have success property", prepData);
      it("should return 200", prepStatus);
    });
  });
}


// EXPORT
// =============================================================================

export default tests;
