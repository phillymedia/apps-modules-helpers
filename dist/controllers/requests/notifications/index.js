"use strict";

/**
 * PHILLLY HELPERS
 * requests/notifications
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
var core = require("./core");
var endpoint = require("./endpoint");
var publish = require("./publish");
var subscribe = require("./subscribe");

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
  getInput: core.getInput,
  getInputEndpoint: endpoint.getInput,
  getInputPublish: publish.getInput,
  getInputSubscribe: subscribe.getInput
};