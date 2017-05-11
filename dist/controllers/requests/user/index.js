"use strict";

/**
 * PHILLLY HELPERS
 * requests/user
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
var core = require("./core");
// const subscribe = require("./subscribe");
var unsubscribe = require("./unsubscribe");
var endpoint = require("./endpoint");

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
  getInput: core.getInput,
  // getInputUserSubscribe: subscribe.getInput,
  getInputUnsubscribe: unsubscribe.getInput,
  getInputEndpoint: endpoint.getInput
};