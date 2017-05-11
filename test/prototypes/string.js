/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
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


// MAIN METHODS
// =============================================================================
// TITLE CASE -------------------------------

/**
 * Test the pcToTitleCase method.
 *
 * @method pcToTitleCaseTest
 * @param {function} done
 * @return {function}
 */
const pcToTitleCaseTest = {
	exists: titleExists,
	type: titleType,
	matches: titleMatches,
	errors: titleErrors,
};

/**
 * Test the pcToTitleCase method - exists.
 *
 * @method titleExists
 * @return {function}
 */
function titleExists() {
	// expect method to exist on the prototype
	expect(String).to.respondTo("pcToTitleCase");
}

/**
 * Test the pcToTitleCase method - type.
 *
 * @method titleType
 * @return {function}
 */
function titleType() {
	const title = testsStrings.titleCase.pcToTitleCase();
	expect(title).to.be.a("string");
}

/**
 * Test the pcToTitleCase method - correct return.
 *
 * @method titleMatches
 * @return {function}
 */
function titleMatches() {
	const title = testsStrings.titleCase.pcToTitleCase();
	expect(title).to.equal(testsStrings.titleCased);
}

/**
 * Test the pcToTitleCase method - not on the object prototype.
 *
 * @method titleErrors
 * @return {function}
 */
function titleErrors() {
	expect(Object).to.not.respondTo("pcToTitleCase");
}

// TRUNCATE -------------------------------

/**
 * Test the pcTruncate method.
 *
 * @method pcTruncateTest
 * @param {function} done
 * @return {function}
 */
const pcTruncateTest = {
	exists: truncateExists,
	type: truncateType,
	matches: truncateMatches,
	matchesWithout: truncateMatchesWithout,
	errors: truncateErrors,
	missing: truncateMissing,
};

/**
 * Test the pcTruncate method - exists.
 *
 * @method truncateExists
 * @return {function}
 */
function truncateExists() {
	// expect method to exist on the prototype
	expect(String).to.respondTo("pcTruncate");
}

/**
 * Test the pcTruncate method - type.
 *
 * @method truncateType
 * @return {function}
 */
function truncateType() {
	const truncated = testsStrings.truncate.pcTruncate();
	expect(truncated).to.be.a("string");
}

/**
 * Test the pcTruncate method - correct return.
 *
 * @method truncateMatches
 * @return {function}
 */
function truncateMatches() {
	const truncated = testsStrings.truncate.pcTruncate(13, true);
	expect(truncated).to.equal(testsStrings.truncated);
}

/**
 * Test the pcTruncate method - correct return.
 *
 * @method truncateMatches
 * @return {function}
 */
function truncateMatchesWithout() {
	const truncated = testsStrings.truncate.pcTruncate(13);
	expect(truncated).to.equal(testsStrings.truncatedWithout);
}


/**
 * Test the pcTruncate method - throws an error.
 *
 * @method truncateErrors
 * @return {function}
 */
function truncateErrors() {
	expect(testsStrings.truncate.pcTruncate, "bad input").to.throw(Error);
}

/**
 * Test the pcTruncate method - not on the object prototype.
 *
 * @method truncateMissing
 * @return {function}
 */
function truncateMissing() {
	expect(Object).to.not.respondTo("pcTruncate");
}

// GET BYTE COUNT -------------------------------

/**
 * Test the pcGetByteCount method.
 *
 * @method pcGetByteCountTest
 * @param {function} done
 * @return {function}
 */
const pcGetByteCountTest = {
	exists: byteCountExists,
	type: byteCountType,
	matches: byteCountMatches,
	errors: byteCountErrors,
};

/**
 * Test the pcGetByteCount method - exists.
 *
 * @method byteCountExists
 * @return {function}
 */
function byteCountExists() {
	// expect method to exist on the prototype
	expect(String).to.respondTo("pcGetByteCount");
}

/**
 * Test the pcGetByteCount method - type.
 *
 * @method byteCountType
 * @return {function}
 */
function byteCountType() {
	const counted = testsStrings.truncate.pcGetByteCount();
	expect(counted).to.be.a("number");
}

/**
 * Test the pcGetByteCount method - correct return.
 *
 * @method byteCountMatches
 * @return {function}
 */
function byteCountMatches() {
	const counted = testsStrings.truncate.pcGetByteCount();
	expect(counted).to.equal(testsStrings.byteCount);
}

/**
 * Test the pcGetByteCount method - not on the object prototype.
 *
 * @method byteCountErrors
 * @return {function}
 */
function byteCountErrors() {
	expect(Object).to.not.respondTo("pcGetByteCount");
}


// TESTS
// =============================================================================

/**
 * String Prototype test methods.
 *
 * @method tests
 */
function tests() {
	// to title case
	describe("To Title Case", () => {
		it("exists on the prototype", pcToTitleCaseTest.exists);
		// everything going right
		context("when called on a String", () => {
			it("returns a string", pcToTitleCaseTest.type);
			it("returns a correctly-formatted string", pcToTitleCaseTest.matches);
		});
		// errors
		context("when called on an Object", () => {
			it("does not exist", pcToTitleCaseTest.errors);
		});
	});
	// truncate
	describe("Truncate", () => {
		it("exists on the prototype", pcTruncateTest.exists);
		// everything going right
		context("when called on a String", () => {
			it("returns a string", pcTruncateTest.type);
			context("when useWordBoundary is set to true", () => {
				it("returns a correctly-formatted string", pcTruncateTest.matches);
			});
			context("when useWordBoundary is set to false", () => {
				it("returns a correctly-formatted string", pcTruncateTest.matchesWithout);
			});
		});
		// errors
		context("when called with bad arguments", () => {
			it("throws an error", pcTruncateTest.errors);
		});
		context("when called on an Object", () => {
			it("does not exist", pcTruncateTest.missing);
		});
	});
	// get byte count
	describe("Get Byte Count", () => {
		it("exists on the prototype", pcGetByteCountTest.exists);
		// everything going right
		context("when called on a String", () => {
			it("returns a number", pcGetByteCountTest.type);
			it("returns the correct count", pcGetByteCountTest.matches);
		});
		// errors
		context("when called on an Object", () => {
			it("does not exist", pcGetByteCountTest.errors);
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
