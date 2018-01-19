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
const infoLogged = "Debug";


// METHODS
// =============================================================================

/**
 * Tests log.info() - no errors.
 */
function noErrors() {
	// call info
	expect(log.debug()).to.not.throw;
}

/**
 * Tests log.info() - calls console.log.
 */
function callsConsole() {
	// call info
	log.debug(infoLogged);
	expect(console.log).to.be.called;
}

// TESTS
// =============================================================================

/**
 * Errors test methods.
 */
function tests() {
	before(function () {
		// stub out console log
		stub(log, "debug").callsFake(() => {});
	});
	after(function () {
		// restore original value
		log.debug.restore();
	});
	// everything going right
	context("when structured correctly", function () {
		it("returns no errors", noErrors);
		it("calls console.info", callsConsole);
	});
}


// EXPORT
// =============================================================================

export default tests;
