/**
 * PHILLLY HELPERS
 * request module
 * Hopefully reusable class of functions.
 */

// SIBLING MODULES
// =============================================================================
const core = require("./core");
const feed = require("./feed");
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
	getInputFeedSearch: feed.getInputSearch,
	/*
	// notifications
	getInputDeviceHints: notifications.getInput,
	getInputDeviceEndpoint: notifications.getInputEndpoint,
	getInputDeviceSend: notifications.getInputPublish,
	getInputDeviceData: notifications.getInputSubscribe,
	// user
	getInputUser: user.getInput,
	getInputUserSubscribe: user.getInputSubscribe,
	getInputUserUnsubscribe: user.getInputUnsubscribe,
	getInputUserEndpoint: user.getInputEndpoint,
	// system
	getInputSystem: system.getInput,
	getInputAdmin: system.getInputAdmin,
	getInputAdminDelete: system.getInputAdminDelete,
	*/
};
