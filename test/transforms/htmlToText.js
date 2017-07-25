/* eslint-disable no-unused-expressions */

// dependencies
import { isString } from "lodash";
import { expect } from "chai";
import { decode } from "html-entities";
import striptags from "striptags";
// methods to test
import {
	htmlToText,
} from "MAIN";


// PRIVATE VARIABLES
// =============================================================================

const testHtml = "<p>Some <b>HTML</b>.</p>";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Test the htmlToText method - no errors.
 *
 * @method noThrow
 */
function noThrow() {
	// expect no error
	expect(htmlToText, testHtml).to.not.throw(Error);
}

/**
 * Test the htmlToText method - returns empty string.
 *
 * @method empty
 */
function empty() {
	// call the test method
	const stripped = htmlToText();
	// expect no error
	expect(stripped).to.be.empty;
}

/**
 * Test the htmlToText method - type.
 *
 * @method noErrors
 */
function noErrors() {
	// call the test method
	const stripped = htmlToText(testHtml);
	// expect correct methods to be called
	expect(isString).to.be.called;
	expect(striptags).to.be.called;
	expect(decode).to.be.called;
	// expect correct type
	expect(stripped).to.be.a("string");
	// expect stripped
	expect(stripped).to.not.include("<b>");
	expect(stripped).to.not.include("<p>");
}


// EXPORT
// =============================================================================

export {
	empty,
	noErrors,
	noThrow,
};
