/**
 * PHILLLY HELPERS
 * requests/notifications/endpoint
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// sibling modules
const errors = require("COMP/errors");
// const transforms = require("COMP/transforms");


/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

/**
 * Get the inputs from the notifications/endpoint route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab input from the request body
	const endpointHint = {};
	endpointHint.username = req.input.deviceUsername || "";
	endpointHint.token = req.input.deviceToken || "";
	// make sure one or the other actually has content
	if (!endpointHint.username && !endpointHint.token) {
		return next(errors.makeError("NoUsernameOrToken",
			"Missing both username and token.", "Helpers getInputDeviceEndpoint", 400));
	}
	// optional device switch setting
	const deviceSwitch = req.input.deviceSwitch ? "true" : "false";
	// if all is good, set input to request
	req.endpointHint = endpointHint;
	req.deviceSwitch = deviceSwitch;
	// next!
	return next();
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput,
};
