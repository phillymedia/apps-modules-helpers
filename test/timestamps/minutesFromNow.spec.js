/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
  now,
  minutesFromNow,
} = require("MAIN");


// METHODS
// =============================================================================

/**
 * Test the minutesFromNow method - is a date, calls underlying methods.
 *
 */
function ooo() {
  // get the minutes from now
  const minutes = minutesFromNow(15);
  // expect to call now
  expect(now).to.be.called;
  // getminutes
  expect(Date.getMinutes).to.be.called;
  // setminutes
  expect(Date.setMinutes).to.be.called;
  // expect to be a date
  expect(minutes).to.be.a("date");
}


/**
 * Test the minutesFromNow method - no errors.
 *
 */
function noErrors() {
  // expect to not throw an error
  expect(minutesFromNow, 15).to.not.throw(Error);
}

/**
 * Test the minutesFromNow method - missing arguments, no errors.
 *
 */
function noErrorsMissing() {
  // expect to still not throw an error
  expect(minutesFromNow).to.not.throw(Error);
}

/**
 * Test the minutesFromNow method - reversed, no errors.
 *
 */
function noErrorsReversed() {
  // expect to still not throw an error
  expect(minutesFromNow, 15, true).to.not.throw(Error);
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
