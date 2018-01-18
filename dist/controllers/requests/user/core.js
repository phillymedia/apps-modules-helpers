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
 * Get the inputs from the user route.
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
	// grab from the request
	var _ref = req.input || req,
	    user = _ref.user;
	// error if missing


	if (!user || !(0, _lodash.isString)(user)) {
		return next((0, _errors.makeError)("NoUser", "Missing or invalid user.", "Helpers getInputUser", 400));
	}
	// set to request
	req.user = user;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

// APP -------------------------------
// sibling modules
exports.default = getInput;