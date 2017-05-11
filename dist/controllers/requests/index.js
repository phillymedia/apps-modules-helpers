"use strict";

/**
 * PHILLLY HELPERS
 * request module
 * Hopefully reusable class of functions.
 */

// SIBLING MODULES
// =============================================================================
var core = require("./core");
var feed = require("./feed");
/*
const notifications = require("./notifications");
const user = require("./user");
const system = require("./system");
*/

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	// core
	getRawBody: core.getRawBody,
	standardizeInput: core.standardizeInput,
	// feed
	getInputFeedDetail: feed.getInputDetail,
	getInputFeedSearch: feed.getInputSearch
};