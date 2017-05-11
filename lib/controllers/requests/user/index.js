/**
 * PHILLLY HELPERS
 * requests/user
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const core = require("./core");
// const subscribe = require("./subscribe");
const unsubscribe = require("./unsubscribe");
const endpoint = require("./endpoint");


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput: core.getInput,
	// getInputUserSubscribe: subscribe.getInput,
	getInputUnsubscribe: unsubscribe.getInput,
	getInputEndpoint: endpoint.getInput,
};
