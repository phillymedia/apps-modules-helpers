/**
 * PHILLLY HELPERS
 * requests/notifications
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const core = require("./core");
const endpoint = require("./endpoint");
const publish = require("./publish");
const subscribe = require("./subscribe");


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput: core.getInput,
	getInputEndpoint: endpoint.getInput,
	getInputPublish: publish.getInput,
	getInputSubscribe: subscribe.getInput,
};
