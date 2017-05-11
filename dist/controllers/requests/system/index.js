"use strict";

/**
 * PHILLLY HELPERS
 * requests/system
 * Hopefully reusable class of functions.
 */

// SIBLING MODULES
// =============================================================================
var core = require("./core");
var admin = require("./admin");

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
  getInput: core.getInput,
  getInputAdmin: admin.getInput,
  getInputAdminDelete: admin.getInputDelete
};