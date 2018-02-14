/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  daysFromNow,
  endOfDay,
  endOfWeek,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the endOfWeek method - is a date, calls underlying methods.
 *
 */
function ooo() {
  // get the end of the day
  const time = endOfWeek();
  // expect to call daysFromNow
  expect(daysFromNow).to.be.called;
  // and endOfDay
  expect(endOfDay).to.be.called;
  // setHours
  expect(Date.setHours).to.be.called;
  // expect to be a date
  expect(time).to.be.a("date");
}


/**
 * Test the endOfWeek method - no errors.
 *
 */
function noErrors() {
  // expect to not throw an error
  expect(endOfWeek).to.not.throw(Error);
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
