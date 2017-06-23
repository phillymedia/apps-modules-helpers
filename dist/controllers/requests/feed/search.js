"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require("lodash");

var _errors = require("../../errors");

// const transforms = require("COMP/transforms");


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
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function getInput(req, res, next) {
	// grab input from the request input
	var search = req.input.search;
	// if no id, abort!
	if (!search || !(0, _lodash.isString)(search)) {
		return next((0, _errors.makeError)("NoSearchTerm", "No key words specified.", 400));
	}
	// save the id to req.id
	req.search = search;
	// continue processing
	return next();
}

// EXPORTS
// =============================================================================

// APP -------------------------------
// sibling modules
exports.default = getInput;