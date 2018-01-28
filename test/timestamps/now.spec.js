/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  now,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the now method - is a date.
 */
function nowType() {
  // get the now()
  const currNow = now();
  // expect to be a date
  expect(currNow).to.be.a("date");
}

/**
 * Test the now method - no errors.
 *
 * @return {function}
 */
function nowNoErrors() {
  // expect description to match
  expect(now).to.not.throw(Error);
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 */
function tests() {
  it("does not error", nowNoErrors);
  it("returns a date", nowType);
}


// EXPORT
// =============================================================================

export default tests;
