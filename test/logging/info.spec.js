/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-arrow-callback */

// DEPENDENCIES
// =============================================================================
import log from "COMP/logging";
import { expect } from "chai";
import { stub } from "sinon";


// PROPERTIES
// =============================================================================

/**
 * A fake log.
 */
const infoLogged = "Info!";


// METHODS
// =============================================================================

/**
 * Tests log.info() - no errors.
 */
function noErrors() {
	// call info
	expect(log.info()).to.not.throw;
}

/**
 * Tests log.info() - calls console.log.
 */
function callsConsole() {
	// call info
	log.info(infoLogged);
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
		stub(log, "info").callsFake(() => {});
	});
	after(function () {
		// restore original value
		log.info.restore();
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
