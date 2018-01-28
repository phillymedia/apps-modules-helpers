/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  timerStart,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the timerStart method - no errors.
 *
 */
function startNoErrors() {
  // expect no error
  expect(timerStart).to.not.throw(Error);
}

/**
 * Test the timerStart method - type.
 *
 */
function startType() {
  // create an error
  const timer = timerStart();
  // expect array of numbers
  expect(timer).to.be.an("array").with.a.length.valueOf(2);
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 */
function tests() {
  it("does not error", startNoErrors);
  it("returns an array", startType);
}


// EXPORT
// =============================================================================

export default tests;
