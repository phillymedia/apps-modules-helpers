/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================

import { expect } from "chai";
import { until } from "MAIN";


// METHODS
// =============================================================================

/**
 * Test the until method - no errors.
 *
 * @param {function} done - A callback.
 * @return {function}
 */
function noErrors(done) {
  until(new Promise((resolve => setTimeout(resolve, 1500, "two"))), 0.5, "one")
    .then((value) => {
      // expect until's internal timeout of 1 second to resolve first
      expect(value).to.equal("one");
      // done!
      done();
    })
    .catch(done);
}

// MONGOOSE ERROR -------------------------------


// TESTS
// =============================================================================

/**
 * Errors test methods.
 */
function tests() {
  // resolves a promise within a time limit
  context("when structured correctly", () => {
    it("stops at the internal timeout and returns the expected value", noErrors);
  });
}


// EXPORT
// =============================================================================

export default tests;

