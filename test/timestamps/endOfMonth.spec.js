/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  monthsFromNow,
  endOfDay,
  endOfMonth,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the endOfMonth method - is a date, calls underlying methods.
 *
 */
function ooo() {
  // get the end of the day
  const time = endOfMonth();
  // expect to call monthsFromNow
  expect(monthsFromNow).to.be.called;
  // and endOfDay
  expect(endOfDay).to.be.called;
  // setHours
  expect(Date.setHours).to.be.called;
  // expect to be a date
  expect(time).to.be.a("date");
}


/**
 * Test the endOfMonth method - no errors.
 *
 */
function noErrors() {
  // expect to not throw an error
  expect(endOfMonth).to.not.throw(Error);
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
