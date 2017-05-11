"use strict";

var _lodash = require("lodash");

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
var core = require("./core");

// THIRD PARTY LIBRARIES -------------------------------
// lodash


/*
* PRIVATE PROPERTIES
* const _privateBar;
*/

// global object
var newString = {};

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
	var str = this;
	return (0, _lodash.startCase)((0, _lodash.toLower)(str));
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
	var str = this;
	if (!str) {
		throw new Error("No string!");
	}
	var options = {
		omission: "..."
	};
	if (len) {
		if (!(0, _lodash.isNumber)(len)) {
			throw new Error("Bad input!");
		}
		options.length = len;
	}
	if (useWordBoundary) {
		options.separator = " ";
	}
	return (0, _lodash.truncate)(str, options);
}

/**
* Get the byte count of a string.
*
* @method pcGetByteCount
* @return {String} 				Returns the transformed string.
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