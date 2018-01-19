/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================

import { expect } from "chai";
import { makeError, formatError } from "MAIN";

// code and message are required
const testError = {
	code: "TestError",
	message: "Just a test of the error-creator.",
};


// METHODS
// =============================================================================

/**
 * Test the formatError method - working.
 *
 * @method working
 * @return {function}
 */
function working() {
	const errorToFormat = makeError(testError.code, testError.message);
	// create an error
	const resultingError = formatError(errorToFormat);
	// expect error to be an error object
	expect(resultingError).to.be.an("error");
	// expect error to match our test error
	expect(resultingError.message).to.equal(testError.message);
	// expect error to match our test error
	expect(resultingError.statusCode).to.equal(500);
}

/**
 * Test the formatError method - empty.
 *
 * @method fake
 * @return {function}
 */
function fake() {
	// create an error
	const resultingError = formatError();
	// expect error to be an error object
	expect(resultingError).to.be.an("error");
	// expect error to match our test error
	expect(resultingError.code).to.equal("UnknownError");
}

// MONGOOSE ERROR -------------------------------


// TESTS
// =============================================================================

/**
 * Errors test methods.
 */
function tests() {
	// format error
	context("when structured correctly", () => {
		it("formats an error object", working);
	});
	context("when missing error", () => {
		it("creates a 'fake' error", fake);
	});
}


// EXPORT
// =============================================================================

export default tests;

