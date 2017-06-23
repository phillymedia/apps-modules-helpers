/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { expect } from "chai";
import { makeError, formatError } from "MAIN";

// code and message are required
const testError = {
	code: "TestError",
	message: "Just a test of the error-creator.",
};


// MAIN METHODS
// =============================================================================
// MAKE ERROR -------------------------------

/**
 * Test the makeError method.
 *
 * @method makeErrorTest
 * @param {function} done
 * @return {function}
 */
const makeErrorTest = {
	type: errorType,
	message: errorMessage,
	code: errorStatusCode,
	errorType: errorTypeError,
	errorCode: errorStatusCodeError,
};

/**
 * Test the makeError method - type.
 *
 * @method errorType
 * @param {function} done
 * @return {function}
 */
function errorType() {
	// create an error
	const resultingError = makeError(testError.code, testError.message);
	// expect error to be an error object
	expect(resultingError).to.be.an("error");
}

/**
 * Test the makeError method - message.
 *
 * @method errorMessage
 * @param {function} done
 * @return {function}
 */
function errorMessage() {
	// create an error
	const resultingError = makeError(testError.code, testError.message);
	// expect error to match our test error
	expect(resultingError.message).to.equal(testError.message);
}

/**
 * Test the makeError method - status code.
 *
 * @method errorCode
 * @param {function} done
 * @return {function}
 */
function errorStatusCode() {
	// create an error
	const resultingError = makeError(testError.code, testError.message);
	// expect error to match our test error
	expect(resultingError.statusCode).to.equal(500);
}

/**
 * Test the makeError method - fails.
 *
 * @method errorError
 * @param {function} done
 * @return {function}
 */
function errorTypeError() {
	// create an error
	const resultingError = makeError();
	// expect error to be an error object
	expect(resultingError).to.be.an("error");
}
/**
 * Test the makeError method - fails.
 *
 * @method errorStatusCodeError
 * @param {function} done
 * @return {function}
 */
function errorStatusCodeError() {
	// create an error
	const resultingError = makeError();
	// specifically, expect error to be a fake error
	expect(resultingError.statusCode).to.equal(416);
}

// FORMAT ERROR -------------------------------

/**
 * Test the formatError method.
 *
 * @method formatErrorTest
 * @param {function} done
 * @return {function}
 */
const formatErrorTest = {
	type: formatType,
	message: formatMessage,
	code: formatStatusCode,
	errorType: formatTypeError,
	errorCode: formatCodeError,
};

/**
 * Test the formatError method - type.
 *
 * @method formatType
 * @return {function}
 */
function formatType() {
	const errorToFormat = makeError(testError.code, testError.message);
	// create an error
	const resultingError = formatError(errorToFormat);
	// expect error to be an error object
	expect(resultingError).to.be.an("error");
}

/**
 * Test the formatError method - message.
 *
 * @method formatMessage
 * @return {function}
 */
function formatMessage() {
	const errorToFormat = makeError(testError.code, testError.message);
	// create an error
	const resultingError = formatError(errorToFormat);
	// expect error to match our test error
	expect(resultingError.message).to.equal(testError.message);
}

/**
 * Test the formatError method - status code.
 *
 * @method formatStatusCode
 * @return {function}
 */
function formatStatusCode() {
	const errorToFormat = makeError(testError.code, testError.message);
	// create an error
	const resultingError = formatError(errorToFormat);
	// expect error to match our test error
	expect(resultingError.statusCode).to.equal(500);
}

/**
 * Test the formatError method - type.
 *
 * @method formatTypeError
 * @return {function}
 */
function formatTypeError() {
	// create an error
	const resultingError = formatError();
	// expect error to be an error object
	expect(resultingError).to.be.an("error");
}

/**
 * Test the formatError method - code.
 *
 * @method formatStatusCodeError
 * @return {function}
 */
function formatCodeError() {
	// create an error
	const resultingError = formatError();
	// expect error to match our test error
	expect(resultingError.code).to.equal("UnknownError");
}

// MONGOOSE ERROR -------------------------------


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	// make error
	describe("Make Error", () => {
		// everything going right
		context("when structured correctly", () => {
			it("creates an error object", makeErrorTest.type);
			it("has the correct message", makeErrorTest.message);
			it("has the correct status code", makeErrorTest.code);
		});
		// passed bad data
		context("when missing fields", () => {
			it("creates an error object", makeErrorTest.errorType);
			it("has a code to indicate the failure", makeErrorTest.errorCode);
		});
	});
	// format error
	describe("Format Error", () => {
		context("when structured correctly", () => {
			it("formats an error object", formatErrorTest.type);
			it("has the correct message", formatErrorTest.message);
			it("has the correct status code", formatErrorTest.code);
		});
		context("when missing error", () => {
			it("creates an error object", formatErrorTest.errorType);
			it("has a code to indicate the failure", formatErrorTest.errorCode);
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
