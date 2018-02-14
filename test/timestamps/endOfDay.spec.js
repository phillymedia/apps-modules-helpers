/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  now,
  endOfDay,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the endOfDay method - is a date, calls underlying methods.
 *
 */
function ooo() {
  // get the end of the day
  const time = endOfDay();
  // expect to call now
  expect(now).to.be.called;
  // setHours
  expect(Date.setHours).to.be.called;
  // expect to be a date
  expect(time).to.be.a("date");
}


/**
 * Test the endOfDay method - no errors.
 *
 */
function noErrors() {
  // expect to not throw an error
  expect(endOfDay).to.not.throw(Error);
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
    it("does not error", noErrors);
    it("returns a date, calls underlying methods", ooo);
  });
}


// EXPORT
// =============================================================================

export default tests;
