"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _errors = require("../../errors");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the feed/search route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab input from the request input
	var _req$input = req.input,
	    email = _req$input.email,
	    password = _req$input.password,
	    username = _req$input.username;
	// if no parameter, abort!
	// users require emails even if they are being created from usernames

	if (!email && !username) {
		return next((0, _errors.makeError)("MissingParameter", "User identifier required.", "helpers -> getInput", 400));
	}
	// required
	if (username) {
		req.username = username;
	} else {
		// save the parameter to request
		req.email = email;
	}
	// optional
	if (password) {
		req.password = password;
	}
	// continue processing
	return next();
}

// EXPORTS
// =============================================================================

// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// sibling modules
exports.default = getInput;