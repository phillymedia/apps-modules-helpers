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
import { forOwn } from "lodash";

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
	forOwn(extension, (value, key) => {
		Object.defineProperty(original, key, {
			value: extension[key],
			writable: true,
		});
	});
}


/*
* EXPORT THE FUNCTION
* module.exports = function;
*/

// define new prototype functions as properties
exports.addProperties = addProperties;
