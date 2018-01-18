/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// chai
import { expect } from "chai";
// methods to test
const {
	timerStart,
	timerStop,
} = require("MAIN");


// PROPERTIES
// =============================================================================
const testTimer = {
	description: "This is a test timer.",
	s: 0,
};


// METHODS
// =============================================================================

/**
 * Test the timerStop method - is an object.
 *
 * @method stopType
 */
function stopType() {
	// create an error
	const timed = timerStop(timerStart(), testTimer.description);
	// expect to be an object
	expect(timed).to.be.an("object");
	// expect description to match
	expect(timed.description).to.equal(testTimer.description);
	// expect no time to have elapsed
	expect(timed).to.have.a.property("s").that.equals(testTimer.s);
}

/**
 * Test the timerStop method - errors.
 *
 * @method stopErrors
 */
function stopErrors() {
	// expect error when no arguments passed
	expect(timerStop).to.throw(Error);
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	// everything going right
	context("when structured correctly", () => {
		it("returns a matching object, no time elapsed", stopType);
	});
	// missing arguments
	context("when missing arguments", () => {
		it("throws an error", stopErrors);
	});
}


// EXPORT
// =============================================================================

export default tests;
