// DEPENDENCIES
// =============================================================================
// THIRD PARTY LIBRARIES -------------------------------
// lodash
import { forOwn } from "lodash";

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
  forOwn(extension, (value, key) => {
    Object.defineProperty(original, key, {
      value: extension[key],
      writable: true,
    });
  });
}


// EXPORT
// =============================================================================

exports.addProperties = addProperties;
