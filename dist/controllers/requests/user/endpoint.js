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
 * Get the inputs from the user/endpoint route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
/**
 * PHILLLY HELPERS
 * requests/user/endpoint
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// third-party libraries
function getInput(req, res, next) {
	// grab from request
	var _req$input = req.input,
	    emailOld = _req$input.email_old,
	    emailNew = _req$input.email_new;
	// error if missing

	if (!emailOld || !(0, _lodash.isString)(emailOld)) {
		return next((0, _errors.makeError)("NoEmail", "Missing or invalid emailOld.", "Helpers getInputUserEndpoint", 400));
	}
	if (!emailNew || !(0, _lodash.isString)(emailNew)) {
		return next((0, _errors.makeError)("NoEmail", "Missing or invalid emailNew.", "Helpers getInputUserEndpoint", 400));
	}
	// set to request
	req.email_old = emailOld;
	req.email_new = emailNew;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

// sibling modules
exports.default = getInput;