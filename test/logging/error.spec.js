/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-arrow-callback */

// DEPENDENCIES
// =============================================================================
// TESTED METHODS -------------------------------
import log from "COMP/logging";
import { expect } from "chai";
import { stub } from "sinon";


// PRIVATE PROPERTIES
// =============================================================================

/**
 * A fake log.
 */
const errorLogged = "Error";


// MAIN METHODS
// =============================================================================

/**
 * Tests log.error() - no errors.
 */
function noErrors() {
  // call error
  expect(log.error()).to.not.throw;
}

/**
 * Tests log.error() - calls console.error.
 */
function callsConsole() {
  // call error
  log.error(errorLogged);
  expect(console.error).to.be.called;
}

// TESTS
// =============================================================================

/**
 * Errors test methods.
 */
function tests() {
  before(function () {
    // stub out console log
    stub(log, "error").callsFake(() => {});
  });
  after(function () {
    // restore original value
    log.error.restore();
  });
  // everything going right
  context("when structured correctly", function () {
    it("returns no errors", noErrors);
    it("calls console.error", callsConsole);
  });
}


// EXPORT
// =============================================================================

export default tests;
