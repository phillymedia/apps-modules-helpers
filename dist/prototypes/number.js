"use strict";

// DEPENDENCIES
// =============================================================================
// APP -------------------------------
var core = require("./core");

// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

// global object
var newNumber = {};

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Turn a number (1) into an ordinal (1st);
 *
 * @returns {string}
 */
function pcToOrdinal() {
  var num = this;
  var ordinals = ["th", "st", "nd", "rd"];
  var divider = num % 100;
  return num + (ordinals[(divider - 20) % 10] || ordinals[divider] || ordinals[0]);
}

// EXPORT
// =============================================================================

// make ordinal, aka 1 to 1st
newNumber.pcToOrdinal = pcToOrdinal;

// add functions to number as properties
core.addProperties(Number.prototype, newNumber);