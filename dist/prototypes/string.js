"use strict";

var _lodash = require("lodash");

// DEPENDENCIES
// =============================================================================
// APP -------------------------------
var core = require("./core");

// THIRD PARTY LIBRARIES -------------------------------
// lodash


// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

// global object
var newString = {};

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Transform a string to Title Case.
 *
 * @return {string} 				Returns the transformed string.
 */
function pcToTitleCase() {
	var str = this;
	return (0, _lodash.startCase)((0, _lodash.toLower)(str));
}

/**
 * Truncate a string.
 *
 * @param {number} [length=20] - String goal length.
 * @param {any} useWordBoundary - (optional) Break words?
 * @returns {string}
 */
function pcTruncate() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
	var useWordBoundary = arguments[1];

	// grab string
	var str = this;
	if (!str) {
		return "";
	}
	// set up options
	var options = {
		omission: "...",
		length: length
	};
	// optional word boundary
	if (useWordBoundary) {
		options.separator = " ";
	}
	return (0, _lodash.truncate)(str, options);
}

/**
 * Get the byte count of a string.
 *
 * @return {string} - Returns the transformed string.
 */
function pcGetByteCount() {
	var str = this;
	var count = 0;
	var partCount = void 0;
	var stringLength = str.length;
	str = String(str || "");
	(0, _lodash.times)(stringLength, function (i) {
		partCount = encodeURI(str[i]).split("%").length;
		count += partCount === 1 ? 1 : partCount - 1;
	});
	return count;
}

// EXPORTS
// =============================================================================

// e.g. The Empire State Building
newString.pcToTitleCase = pcToTitleCase;

// truncate strings to a given limit
newString.pcTruncate = pcTruncate;

// get the byte length of a string
newString.pcGetByteCount = pcGetByteCount;

// add new string functions to string prototype
core.addProperties(String.prototype, newString);