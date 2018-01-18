/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================

import { expect } from "chai";
// just run the app
import "MAIN";

// code and message are required
const testsNumbers = {
	ordinal: 0,
	ordinaled: "0th",
};


// METHODS
// =============================================================================

/**
 * Test the pcToOrdinal method - exists.
 *
 * @method exists
 * @return {function}
 */
function exists() {
	// expect method to exist on the prototype
	expect(Number).to.respondTo("pcToOrdinal");
}

/**
 * Test the pcToOrdinal method - type.
 *
 * @method type
 * @return {function}
 */
function type() {
	const ordinaled = testsNumbers.ordinal.pcToOrdinal();
	expect(ordinaled).to.be.a("string");
	expect(ordinaled).to.equal(testsNumbers.ordinaled);
}

/**
 * Test the pcToOrdinal method - not on the string prototype.
 *
 * @method missing
 * @return {function}
 */
function missing() {
	expect(String).to.not.respondTo("pcToOrdinal");
}


// TESTS
// =============================================================================

/**
 * String Prototype test methods.
 *
 * @method tests
 */
function tests() {
	// to ordinal
	describe("To Ordinal", () => {
		it("exists on the prototype", exists);
		// everything going right
		context("when called on a Number", () => {
			it("returns an appropriate string", type);
		});
		// errors
		context("when called on a String", () => {
			it("does not exist", missing);
		});
	});
}


// EXPORT
// =============================================================================

export default tests;
