/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  now,
  hoursFromNow,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the hoursFromNow method - is a date, calls underlying methods.
 *
 */
function ooo() {
  // get the hours from now
  const hours = hoursFromNow(15);
  // expect to call now
  expect(now).to.be.called;
  // getDate
  expect(Date.getDate).to.be.called;
  // setDate
  expect(Date.setDate).to.be.called;
  // expect to be a date
  expect(hours).to.be.a("date");
}


/**
 * Test the hoursFromNow method - no errors.
 *
 */
function noErrors() {
  // expect to not throw an error
  expect(hoursFromNow, 15).to.not.throw(Error);
}

/**
 * Test the hoursFromNow method - missing arguments, no errors.
 *
 */
function noErrorsMissing() {
  // expect to still not throw an error
  expect(hoursFromNow).to.not.throw(Error);
}

/**
 * Test the hoursFromNow method - reversed, no errors.
 *
 */
function noErrorsReversed() {
  // expect to still not throw an error
  expect(hoursFromNow, 15, true).to.not.throw(Error);
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
  // missing arguments
  context("when missing arguments", () => {
    it("just sets hours to 0 and works", noErrorsMissing);
  });
  // missing arguments
  context("when reversed", () => {
    it("still works", noErrorsReversed);
  });
}


// EXPORT
// =============================================================================

export default tests;
