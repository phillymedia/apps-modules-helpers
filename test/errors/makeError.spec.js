/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================

import { expect } from "chai";
import { makeError } from "MAIN";

// code and message are required
const testError = {
  code: "TestError",
  message: "Just a test of the error-creator.",
};


// METHODS
// =============================================================================

/**
 * Test the makeError method - type.
 *
 * @param {function} done
 * @return {function}
 */
function errorNormal() {
  // create an error
  const resultingError = makeError(testError.code, testError.message);
  // expect error to be an error object
  expect(resultingError).to.be.an("error");
  // expect error to match our test error
  expect(resultingError.message).to.equal(testError.message);
  // expect error to match our test error
  expect(resultingError.statusCode).to.equal(500);
}

/**
 * Test the makeError method - fails.
 *
 * @param {function} done
 * @return {function}
 */
function errorFake() {
  // create an error
  const resultingError = makeError();
  // expect error to be an error object
  expect(resultingError).to.be.an("error");
  // specifically, expect error to be a fake error
  expect(resultingError.statusCode).to.equal(416);
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 */
function tests() {
  // everything going right
  context("when structured correctly", () => {
    it("creates an error object", errorNormal);
  });
  // passed bad data
  context("when missing fields", () => {
    it("creates a 'fake' error", errorFake);
  });
}


// EXPORT
// =============================================================================

export default tests;

