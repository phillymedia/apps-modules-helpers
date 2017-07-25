/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// PROPERTIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isString, trimEnd } from "lodash";
import { expect } from "chai";
// APP -------------------------------
// methods to test
import {
	stripTrailingSlash,
} from "MAIN";


// PROPERTIES
// =============================================================================

const testSlashes = "/some/path/with/too/many/slashes/";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Test the stripTrailingSlash method - no errors.
 *
 * @method noThrow
 */
function noThrow() {
	// expect no error
	expect(stripTrailingSlash, testSlashes).to.not.throw(Error);
}

/**
 * Test the stripTrailingSlash method - makes appropriate calls.
 *
 * @method noErrors
 */
function noErrors() {
	// call the test method
	const stripped = stripTrailingSlash(testSlashes);
	// expect correct methods to be called
	expect(isString).to.be.called;
	expect(trimEnd).to.be.called;
	// expect correct type
	expect(stripped).to.be.a("string");
	// expect stripped
	expect(stripped).to.not.match(/\/$/);
}

/**
 * Test the stripTrailingSlash method - returns empty string.
 *
 * @method empty
 */
function empty() {
	// call the test method
	const stripped = stripTrailingSlash();
	// expect no error
	expect(stripped).to.be.empty;
}


// EXPORT
// =============================================================================

export {
	empty,
	noErrors,
	noThrow,
};
