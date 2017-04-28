/**
 * PHILLLY HELPERS
 * requests/feed/search
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("@/config");
// sibling modules
const errors = require("@/controllers/errors");
// const transforms = require("@/controllers/transforms");

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* CONSTRUCTOR METHOD
* function Foo(){ // set some variables up }
*/
function Main() {
	/*
	* PUBLIC PROPERTIES
	* this.publicBar = foo;
	*/
}


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
 * Get the inputs from the feed/search route.
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
* EXPORTED METHODS
* Foo.prototype.publicBar = publicBar;
*/

// ADD INPUT
// =============================================================================
// for feed/search
Main.prototype.getInput = getInput;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
