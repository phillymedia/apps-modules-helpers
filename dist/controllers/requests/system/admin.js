"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInputDelete = exports.getInput = undefined;

var _lodash = require("lodash");

var _errors = require("../../errors");

var _transforms = require("../../transforms");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the system/admin route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail

// sibling modules
function getInput(req, res, next) {
	// grab item
	var item = req.input.item;
	// if no item, abort!

	if (!item) {
		return next((0, _errors.makeError)("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = (0, _transforms.safeParse)(req.input.item);
	// error?
	if ((0, _lodash.isError)(item)) {
		return next((0, _errors.makeError)("InvalidRequest", "Invalid request input:" + (0, _transforms.safeStringify)(req.input), "Helpers getInputAdmin > safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next((0, _errors.makeError)("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
	}
	// otherwise, set to request
	req.item = item;
	// next!
	return next();
}

/**
 * Get the inputs from the system/admin/delete route.
 *
 * @method getInputDelete
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
// DEPENDENCIES
// =============================================================================
// third-party libraries
function getInputDelete(req, res, next) {
	// grab item
	var item = req.input.item;
	// if no item, abort!

	if (!item) {
		return next((0, _errors.makeError)("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = (0, _transforms.safeParse)(req.input.item);
	// error?
	if ((0, _lodash.isError)(item)) {
		return next((0, _errors.makeError)("InvalidRequest", "Invalid request input:" + (0, _transforms.safeStringify)(req.input), "Helpers getInputAdmin > safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next((0, _errors.makeError)("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
	}
	// otherwise, set to request
	req.item = item;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

exports.getInput = getInput;
exports.getInputDelete = getInputDelete;