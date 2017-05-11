"use strict";

var _lodash = require("lodash");

/*
* PUBLIC METHODS
* function publicBar(){ const self = this; return this.foo; }
*/

/**
* Define new prototype functions as properties.
*
* @method _addProperties
* @param {Object} original		The original prototype.
* @param {Object} extension		To be added to the prototype.
* @return {Object} 				Returns the transformed prototype.
*/
function addProperties(original, extension) {
	(0, _lodash.forOwn)(extension, function (value, key) {
		Object.defineProperty(original, key, {
			value: extension[key],
			writable: true
		});
	});
}

/*
* EXPORT THE FUNCTION
* module.exports = function;
*/

// define new prototype functions as properties
/**
* PHILLY NOTIFICATIONS APP
* the core prototypes module
**/

// SETUP
// =============================================================================
// DEPENDENCIES
// =============================================================================
// THIRD PARTY LIBRARIES -------------------------------
// lodash
exports.addProperties = addProperties;