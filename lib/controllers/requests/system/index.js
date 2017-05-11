/**
 * PHILLLY HELPERS
 * requests/system
 * Hopefully reusable class of functions.
 */

// SIBLING MODULES
// =============================================================================
const core = require("./core");
const admin = require("./admin");


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput: core.getInput,
	getInputAdmin: admin.getInput,
	getInputAdminDelete: admin.getInputDelete,
};
