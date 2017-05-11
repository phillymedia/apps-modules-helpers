"use strict";

/**
 * PHILLLY HELPERS
 * requests/feed
 * Hopefully reusable class of functions.
 */

// SIBLING MODULES
// =============================================================================
var detail = require("./detail");
var search = require("./search");

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
  getInputDetail: detail.getInput,
  getInputSearch: search.getInput
};