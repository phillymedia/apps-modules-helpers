/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
import { standardizeInput, getInputFeedSearch } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import { expect } from "chai";


// PROPERTIES
// =============================================================================
// PRVIVATE -------------------------------
const testInputSettings = {
  method: "POST",
  body: {
    search: "peanut butter",
    id: [
      456,
      891,
    ],
  },
};


// METHODS
// =============================================================================

/**
 * Test the getInputFeedSearch method - errors when no search term.
 *
 * @param {function} done
 * @return {function}
 */
function emptyErrors(done) {
  // get the request
  const { badRequest: request, response } = this;
  // call test method
  getInputFeedSearch(request, response, (err) => {
    expect(err).to.be.an("error").which.has.property("code").that.equals("NoSearchTerm");
    return done();
  });
}

/**
 * Test the getInputFeedSearch method - no errors.
 *
 * @param {function} done
 * @return {function}
 */
function noErrors(done) {
  // get the request
  const { request, response } = this;
  // call test method
  getInputFeedSearch(request, response, (err) => {
    // handle errors
    if (err) {
      return done(err);
    }
    // otherwise...
    expect(err).to.not.exist;
    expect(request).to.have.property("search").that.equals(testInputSettings.body.search);
    return done();
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
    before(function (done) {
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
    context("when no data sent", () => {
      it("should error", emptyErrors);
    });
    context("when data sent", () => {
      it("should not error", noErrors);
    });
  });
}


// EXPORT
// =============================================================================

export default tests;
