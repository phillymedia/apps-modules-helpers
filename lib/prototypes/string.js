// DEPENDENCIES
// =============================================================================
// APP -------------------------------
const core = require("./core");

// THIRD PARTY LIBRARIES -------------------------------
// lodash
import { startCase, toLower, truncate, times } from "lodash";


// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

// global object
const newString = {};


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Transform a string to Title Case.
 *
 * @return {string} - Returns the transformed string.
 */
function pcToTitleCase() {
  const str = this;
  return startCase(toLower(str));
}

/**
 * Truncate a string.
 *
 * @param {number} [length=20] - String goal length.
 * @param {any} useWordBoundary - (optional) Break words?
 * @returns {string}
 */
function pcTruncate(length = 20, useWordBoundary) {
  // grab string
  const str = this;
  if (!str) {
    return "";
  }
  // set up options
  const options = {
    omission: "...",
    length,
  };
  // optional word boundary
  if (useWordBoundary) {
    options.separator = " ";
  }
  return truncate(str, options);
}

/**
 * Get the byte count of a string.
 *
 * @return {string} - Returns the transformed string.
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
