/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
import { expect } from "chai";
// just run the app
import "MAIN";

// code and message are required
const testsStrings = {
	titleCase: "SOME WORDS TO BE TITLE CASED",
	titleCased: "Some Words To Be Title Cased",
	truncate: "A long sentence full of lots of words to be cut down to a smaller sentence.",
	truncated: "A long...",
	truncatedWithout: "A long sen...",
	badInput: { foo: "bar" },
	byteCount: 75,
};


// METHODS
// =============================================================================

/**
 * Test the pcTruncate method - exists.
 *
 * @method exists
 * @return {function}
 */
function exists() {
	// expect method to exist on the prototype
	expect(String).to.respondTo("pcTruncate");
}

/**
 * Test the pcTruncate method - type.
 *
 * @method type
 * @return {function}
 */
function type() {
	const truncated = testsStrings.truncate.pcTruncate();
	expect(truncated).to.be.a("string");
}

/**
 * Test the pcTruncate method - correct return.
 *
 * @method truncateMatches
 * @return {function}
 */
function matches() {
	const truncated = testsStrings.truncate.pcTruncate(13, true);
	expect(truncated).to.equal(testsStrings.truncated);
}

/**
 * Test the pcTruncate method - correct return.
 *
 * @method truncateMatches
 * @return {function}
 */
function matchesWithout() {
	const truncated = testsStrings.truncate.pcTruncate(13);
	expect(truncated).to.equal(testsStrings.truncatedWithout);
}


/**
 * Test the pcTruncate method - throws an error.
 *
 * @method truncateErrors
 * @return {function}
 */
function errors() {
	expect(testsStrings.truncate.pcTruncate, "").to.not.throw;
}

/**
 * Test the pcTruncate method - not on the object prototype.
 *
 * @method truncateMissing
 * @return {function}
 */
function missing() {
	expect(Object).to.not.respondTo("pcTruncate");
}


// TESTS
// =============================================================================

/**
 * String Prototype test methods.
 *
 * @method tests
 */
function tests() {
	// truncate
	it("exists on the prototype", exists);
	// everything going right
	context("when called on a String", () => {
		it("returns a string", type);
		context("when useWordBoundary is set to true", () => {
			it("returns a correctly-formatted string", matches);
		});
		context("when useWordBoundary is set to false", () => {
			it("returns a correctly-formatted string", matchesWithout);
		});
	});
	// errors
	context("when called with an empty string", () => {
		it("returns an empty string", errors);
	});
	context("when called on an Object", () => {
		it("does not exist", missing);
	});
}


// EXPORT
// =============================================================================

export default tests;
