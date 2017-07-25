/* eslint-disable no-unused-expressions */

// dependencies
import { attempt, isString } from "lodash";
import { expect } from "chai";
// methods to test
import {
	safeParse,
} from "MAIN";


// PROPERTIES
// =============================================================================

const testStringify = {
	foo: "bar",
};
const testParse = JSON.stringify(testStringify);
const testHtml = "<p>Some <b>HTML</b>.</p>";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Test the safeParse method - doesn't throw.
 *
 * @method noThrow
 */
function noThrow() {
	// expect no error
	expect(safeParse, testParse).to.not.throw(Error);
}

/**
 * Test the safeParse method - no errors.
 *
 * @method noErrors
 */
function noErrors() {
	// call the test method
	const parsed = safeParse(testParse);
	// expect correct methods to be called
	expect(isString).to.be.called;
	expect(attempt).to.be.called;
	expect(JSON.parse).to.be.called;
	// expect correct type
	expect(parsed).to.be.an("object");
}

/**
 * Test the safeParse method - returns error.
 *
 * @method hasError
 */
function hasError() {
	// call the test method
	const parsed = safeParse(testHtml);
	// expect no error
	expect(parsed).to.be.an("error");
}


// EXPORT
// =============================================================================

export {
	noErrors,
	noThrow,
	hasError,
};
