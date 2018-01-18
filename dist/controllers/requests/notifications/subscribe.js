"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require("lodash");

var _errors = require("../../errors");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the notifications/subscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function getInput(req, res, next) {
	// grab input from the request input
	var _req$input = req.input,
	    deviceId = _req$input.deviceToken,
	    userData = _req$input.userData;
	// require device token

	if (!deviceId || !(0, _lodash.isString)(deviceId)) {
		return next((0, _errors.makeError)("NoToken", "Missing or invalid device token.", "Helpers getInputDeviceData", 400));
	}
	// userdata is optional
	if (userData && !(0, _lodash.isString)(userData)) {
		return next((0, _errors.makeError)("InvalidUserdata", "Invalid user data.", "Helpers getInputDeviceData", 400));
	}
	// if all is good, set input to request
	req.deviceId = deviceId;
	req.userData = userData;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

// APP -------------------------------
// sibling modules
exports.default = getInput;