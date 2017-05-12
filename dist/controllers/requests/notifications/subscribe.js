"use strict";

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 * requests/notifications/subscribe
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
var conf = require("../../../config");
// third-party libraries

// sibling modules
var errors = require("../../errors");
// const transforms = require("COMP/transforms");

// CONFIG -------------------------------
var _debug = conf.debug; // eslint-disable-line no-unused-vars


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
 * Get the inputs from the notifications/subscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab input from the request input
	var deviceId = req.input.deviceToken;
	var userData = req.input.userData;
	// require device token
	if (!deviceId || !(0, _lodash.isString)(deviceId)) {
		return next(errors.makeError("NoToken", "Missing or invalid device token.", "Helpers getInputDeviceData", 400));
	}
	// userdata is optional
	if (userData && !(0, _lodash.isString)(userData)) {
		return next(errors.makeError("InvalidUserdata", "Invalid user data.", "Helpers getInputDeviceData", 400));
	}
	// if all is good, set input to request
	req.deviceId = deviceId;
	req.userData = userData;
	// next!
	return next();
}

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput: getInput
};