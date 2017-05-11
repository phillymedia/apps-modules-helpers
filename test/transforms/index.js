/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { attempt, isString, trimEnd } from "lodash";
import { expect } from "chai";
import { decode } from "html-entities";
import striptags from "striptags";
// methods to test
import {
	safeStringify,
	safeParse,
	htmlToText,
	stripTrailingSlash,
} from "MAIN";


// PRIVATE VARIABLES
// =============================================================================

const testStringify = {
	foo: "bar",
};
const testParse = JSON.stringify(testStringify);
const testHtml = "<p>Some <b>HTML</b>.</p>";
const testSlashes = "/some/path/with/too/many/slashes/";


// MAIN METHODS
// =============================================================================
// SAFE STRINGIFY -------------------------------

/**
 * Test the safeStringify method.
 *
 * @constant safeStringifyTest
 */
const safeStringifyTest = {
	noErrors: stringifyNoErrors,
	type: stringifyType,
	undefined: stringifyUndefined,
	ooo: stringifyOOO,
};

/**
 * Test the safeStringify method - makes appropriate calls.
 *
 * @method stringifyOOO
 */
function stringifyOOO() {
	// call the test method
	safeStringify(testStringify);
	// expect correct methods to be called
	expect(attempt).to.be.called;
	expect(JSON.stringify).to.be.called;
}

/**
 * Test the safeStringify method - no errors.
 *
 * @method stringifyNoErrors
 */
function stringifyNoErrors() {
	// expect no error
	expect(safeStringify, testStringify).to.not.throw(Error);
}

/**
 * Test the safeStringify method - type.
 *
 * @method stringifyType
 */
function stringifyType() {
	// call the test method
	const stringified = safeStringify(testStringify);
	// expect correct type
	expect(stringified).to.be.a("string");
}

/**
 * Test the safeStringify method - returns undefined.
 *
 * @method stringifyUndefined
 */
function stringifyUndefined() {
	// call the test method
	const stringified = safeStringify();
	// expect no error
	expect(stringified).to.be.undefined;
}

// SAFE PARSE -------------------------------

/**
 * Test the safeParse method.
 *
 * @constant safeStringifyTest
 */
const safeParseTest = {
	noErrors: parseNoErrors,
	ooo: parseOOO,
	type: parseType,
	errors: parseErrors,
};

/**
 * Test the safeParse method - no errors.
 *
 * @method stringifyNoErrors
 */
function parseNoErrors() {
	// expect no error
	expect(safeParse, testParse).to.not.throw(Error);
}

/**
 * Test the safeParse method - makes appropriate calls.
 *
 * @method parseOOO
 */
function parseOOO() {
	// call the test method
	safeParse(testParse);
	// expect correct methods to be called
	expect(isString).to.be.called;
	expect(attempt).to.be.called;
	expect(JSON.parse).to.be.called;
}

/**
 * Test the safeParse method - type.
 *
 * @method parseType
 */
function parseType() {
	// call the test method
	const parsed = safeParse(testParse);
	// expect correct type
	expect(parsed).to.be.an("object");
}

/**
 * Test the safeParse method - returns error.
 *
 * @method parseErrors
 */
function parseErrors() {
	// call the test method
	const parsed = safeParse(testHtml);
	// expect no error
	expect(parsed).to.be.an("error");
}

// HTML TO TEXT -------------------------------

/**
 * Test the htmlToText method.
 *
 * @constant htmlToTextTest
 */
const htmlToTextTest = {
	noErrors: htmlNoErrors,
	ooo: htmlOOO,
	type: htmlType,
	stripped: htmlStripped,
	empty: htmlEmpty,
};

/**
 * Test the htmlToText method - no errors.
 *
 * @method htmlNoErrors
 */
function htmlNoErrors() {
	// expect no error
	expect(htmlToText, testHtml).to.not.throw(Error);
}

/**
 * Test the htmlToText method - makes appropriate calls.
 *
 * @method htmlOOO
 */
function htmlOOO() {
	// call the test method
	htmlToText(testHtml);
	// expect correct methods to be called
	expect(isString).to.be.called;
	expect(striptags).to.be.called;
	expect(decode).to.be.called;
}

/**
 * Test the htmlToText method - type.
 *
 * @method htmlType
 */
function htmlType() {
	// call the test method
	const stripped = htmlToText(testHtml);
	// expect correct type
	expect(stripped).to.be.a("string");
}

/**
 * Test the htmlToText method - type.
 *
 * @method htmlStripped
 */
function htmlStripped() {
	// call the test method
	const stripped = htmlToText(testHtml);
	// expect stripped
	expect(stripped).to.not.include("<b>");
	expect(stripped).to.not.include("<p>");
}

/**
 * Test the htmlToText method - returns empty string.
 *
 * @method htmlEmpty
 */
function htmlEmpty() {
	// call the test method
	const stripped = htmlToText();
	// expect no error
	expect(stripped).to.be.empty;
}

// STRIP TRAILING SLASH -------------------------------

/**
 * Test the stripTrailingSlash method.
 *
 * @constant stripTrailingSlashTest
 */
const stripTrailingSlashTest = {
	noErrors: slashesNoErrors,
	ooo: slashesOOO,
	type: slashesType,
	stripped: slashesStripped,
	empty: slashesEmpty,
};

/**
 * Test the stripTrailingSlash method - no errors.
 *
 * @method slashesNoErrors
 */
function slashesNoErrors() {
	// expect no error
	expect(stripTrailingSlash, testSlashes).to.not.throw(Error);
}

/**
 * Test the stripTrailingSlash method - makes appropriate calls.
 *
 * @method slashesOOO
 */
function slashesOOO() {
	// call the test method
	stripTrailingSlash(testSlashes);
	// expect correct methods to be called
	expect(isString).to.be.called;
	expect(trimEnd).to.be.called;
}

/**
 * Test the stripTrailingSlash method - type.
 *
 * @method slashesType
 */
function slashesType() {
	// call the test method
	const stripped = stripTrailingSlash(testSlashes);
	// expect correct type
	expect(stripped).to.be.a("string");
}

/**
 * Test the stripTrailingSlash method - stripped.
 *
 * @method slashesStripped
 */
function slashesStripped() {
	// call the test method
	const stripped = stripTrailingSlash(testSlashes);
	// expect stripped
	expect(stripped).to.not.match(/\/$/);
}

/**
 * Test the stripTrailingSlash method - returns empty string.
 *
 * @method slashesEmpty
 */
function slashesEmpty() {
	// call the test method
	const stripped = stripTrailingSlash();
	// expect no error
	expect(stripped).to.be.empty;
}

// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	// safe stringify
	describe("Safe Stringify", () => {
		context("when passed correct data", () => {
			it("does not error", safeStringifyTest.noErrors);
			it("calls attempt and JSON stringify", safeStringifyTest.ooo);
			it("returns a string", safeStringifyTest.type);
		});
		context("when passed nothing", () => {
			it("returns the same input", safeStringifyTest.undefined);
		});
	});
	// safe parse
	describe("Safe Parse", () => {
		context("when passed correct data", () => {
			it("does not error", safeParseTest.noErrors);
			it("calls attempt and JSON parse", safeParseTest.ooo);
			it("returns an object", safeParseTest.type);
		});
		context("when passed nothing", () => {
			it("returns an error", safeParseTest.errors);
		});
	});
	// html to text
	describe("HTML to Text", () => {
		context("when passed correct data", () => {
			it("does not error", htmlToTextTest.noErrors);
			it("calls striptags and decode", htmlToTextTest.ooo);
			it("returns a string", htmlToTextTest.type);
			it("does not contain html", htmlToTextTest.stripped);
		});
		context("when passed nothing", () => {
			it("returns empty string", htmlToTextTest.empty);
		});
	});
	// strip trailing slash
	describe("Strip Trailing Slash", () => {
		context("when passed correct data", () => {
			it("does not error", stripTrailingSlashTest.noErrors);
			it("calls trimEnd", stripTrailingSlashTest.ooo);
			it("returns a string", stripTrailingSlashTest.type);
			it("does not end with a slash", stripTrailingSlashTest.stripped);
		});
		context("when passed nothing", () => {
			it("returns empty string", stripTrailingSlashTest.empty);
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
