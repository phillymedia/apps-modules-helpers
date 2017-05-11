/**
* PHILLY NOTIFICATIONS APP
* a sub module of prototypes
* Contains the string prototype methods.
**/

// SETUP
// =============================================================================
// DEPENDENCIES
// =============================================================================
// APP -------------------------------
const core = require("./core");

// THIRD PARTY LIBRARIES -------------------------------
// lodash
import { startCase, toLower, truncate, times, isNumber } from "lodash";


/*
* PRIVATE PROPERTIES
* const _privateBar;
*/

// global object
const newString = {};


/*
* PRIVATE METHODS
* function _privateBar(){ const self = this; return this.foo; }
*/

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ const self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

/**
* Transform a string to Title Case.
*
* @method pcToTitleCase
* @return {String} 				Returns the transformed string.
*/
function pcToTitleCase() {
	const str = this;
	return startCase(toLower(str));
}

/**
* Truncate a string.
*
* @method pcTruncate
* @param {Int} len					String goal length.
* @param {Bool} useWordBoundary		Whether to break words or not.
* @return {String} 					Returns the transformed string.
*/
function pcTruncate(len, useWordBoundary) {
	const str = this;
	if (!str) {
		throw new Error("No string!");
	}
	const options = {
		omission: "...",
	};
	if (len) {
		if (!isNumber(len)) {
			throw new Error("Bad input!");
		}
		options.length = len;
	}
	if (useWordBoundary) {
		options.separator = " ";
	}
	return truncate(str, options);
}

/**
* Get the byte count of a string.
*
* @method pcGetByteCount
* @return {String} 				Returns the transformed string.
*/
function pcGetByteCount() {
	let str = this;
	let count = 0;
	let partCount;
	const stringLength = str.length;
	str = String(str || "");
	times(stringLength, (i) => {
		partCount = encodeURI(str[i]).split("%").length;
		count += partCount === 1 ? 1 : partCount - 1;
	});
	return count;
}


/*
* EXPORT THE FINISHED OBJECT
* module.exports = object;
*/

// e.g. The Empire State Building
newString.pcToTitleCase = pcToTitleCase;

// truncate strings to a given limit
newString.pcTruncate = pcTruncate;

// get the byte length of a string
newString.pcGetByteCount = pcGetByteCount;

// add new string functions to string prototype
core.addProperties(String.prototype, newString);
