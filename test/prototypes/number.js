/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { expect } from "chai";
// just run the app
import "MAIN";

// code and message are required
const testsNumbers = {
	ordinal: 0,
	ordinaled: "0th",
};


// MAIN METHODS
// =============================================================================
// TITLE CASE -------------------------------

/**
 * Test the pcToTitleCase method.
 *
 * @method pcToOrdinalTest
 * @param {function} done
 * @return {function}
 */
const pcToOrdinalTest = {
	exists: ordinalExists,
	type: ordinalType,
	matches: ordinalMatches,
	missing: ordinalMissing,
};

/**
 * Test the pcToOrdinal method - exists.
 *
 * @method ordinalExists
 * @return {function}
 */
function ordinalExists() {
	// expect method to exist on the prototype
	expect(Number).to.respondTo("pcToOrdinal");
}

/**
 * Test the pcToOrdinal method - type.
 *
 * @method ordinalType
 * @return {function}
 */
function ordinalType() {
	const ordinaled = testsNumbers.ordinal.pcToOrdinal();
	expect(ordinaled).to.be.a("string");
}

/**
 * Test the pcToOrdinal method - correct return.
 *
 * @method ordinalMatches
 * @return {function}
 */
function ordinalMatches() {
	const ordinaled = testsNumbers.ordinal.pcToOrdinal();
	expect(ordinaled).to.equal(testsNumbers.ordinaled);
}

/**
 * Test the pcToOrdinal method - not on the string prototype.
 *
 * @method ordinalMissing
 * @return {function}
 */
function ordinalMissing() {
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
		it("exists on the prototype", pcToOrdinalTest.exists);
		// everything going right
		context("when called on a Number", () => {
			it("returns a string", pcToOrdinalTest.type);
			it("returns the output", pcToOrdinalTest.matches);
		});
		// errors
		context("when called on a String", () => {
			it("does not exist", pcToOrdinalTest.missing);
		});
	});
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	tests,
};
