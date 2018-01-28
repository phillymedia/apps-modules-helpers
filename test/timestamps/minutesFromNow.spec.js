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
 * Test the minutesFromNow method - is a date.
 *
 */
function minutesType() {
  // get the minutes from now
  const minutes = minutesFromNow(15);
  // expect to be a date
  expect(minutes).to.be.a("date");
}

/**
 * Test the minutesFromNow method - is a date.
 *
 */
function minutesOOO() {
  // get the minutes from now
  minutesFromNow(15);
  // expect to call now
  expect(now).to.be.called;
  // getminutes
  expect(Date.getMinutes).to.be.called;
  // setminutes
  expect(Date.setMinutes).to.be.called;
}


/**
 * Test the minutesFromNow method - is a date.
 *
 */
function minutesNoErrors() {
  // expect to not throw an error
  expect(minutesFromNow, 15).to.not.throw(Error);
}

/**
 * Test the minutesFromNow method - is a date.
 *
 */
function minutesStillNoErrors() {
  // expect to still not throw an error
  expect(minutesFromNow).to.not.throw(Error);
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
    it("does not error", minutesNoErrors);
    it("returns a date", minutesType);
    it("calls now, getMinutes, setMinutes", minutesOOO);
  });
  // missing arguments
  context("when missing arguments", () => {
    it("just set minutes to 0 and work", minutesStillNoErrors);
  });
}


// EXPORT
// =============================================================================

export default tests;
