"use strict";

var _lodash = require("lodash");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
* Define new prototype functions as properties.
*
* @param {Object} original - The original prototype.
* @param {Object} extension - To be added to the prototype.
* @return {Object} - Returns the transformed prototype.
*/
function addProperties(original, extension) {
  (0, _lodash.forOwn)(extension, function (value, key) {
    Object.defineProperty(original, key, {
      value: extension[key],
      writable: true
    });
  });
}

// EXPORT
// =============================================================================

// DEPENDENCIES
// =============================================================================
// THIRD PARTY LIBRARIES -------------------------------
// lodash
exports.addProperties = addProperties;