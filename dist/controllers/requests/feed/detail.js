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
 * Get the inputs from the feed/search route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function getInput(req, res, next) {
	// grab input from the request input
	var id = req.input.id;
	// if no id, or id is an empty array, abort!

	if (!id || (0, _lodash.isArray)(id) && (0, _lodash.isEmpty)(id)) {
		return next((0, _errors.makeError)("NoId", "No ID specified.", 400));
	}
	// save the id to req.id
	req.id = id;
	// continue processing
	return next();
}

// EXPORTS
// =============================================================================

// APP -------------------------------
// sibling modules
exports.default = getInput;