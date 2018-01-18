"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _errors = require("../../errors");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

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
	var _req$input = req.input,
	    username = _req$input.deviceUsername,
	    token = _req$input.deviceToken;
	// make sure one or the other actually has content

	if (!username && !token) {
		return next((0, _errors.makeError)("NoUsernameOrToken", "Missing both username and token.", "Helpers getInputDeviceEndpoint", 400));
	}
	// optional device switch setting
	var deviceSwitch = req.input.deviceSwitch ? "true" : "false";
	// if all is good, set input to request
	req.endpointHint = { username: username, token: token };
	req.deviceSwitch = deviceSwitch;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// sibling modules
exports.default = getInput;