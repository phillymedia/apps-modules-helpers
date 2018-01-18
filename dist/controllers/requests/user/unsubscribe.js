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
 * Get the inputs from the user/unsubscribe route.
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
// config
// import { debug as _debug } from "APP/config";
// third-party libraries
function getInput(req, res, next) {
	// grab from request
	var unsubscriptions = req.input.unsubscriptions || req.input["unsubscriptions[]"];
	// if a string, make into an array
	if ((0, _lodash.isString)(unsubscriptions)) {
		unsubscriptions = [unsubscriptions];
	}
	// if there are no subscriptions, whoops, abort
	if (!unsubscriptions || unsubscriptions && !unsubscriptions.length) {
		return next((0, _errors.makeError)("NoUnsubscriptions", "Nothing to unsubscribe.", "Helpers getInputUserUnsubscribe", 400));
	}
	// set to req.unsubscriptions
	req.unsubscriptions = unsubscriptions;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

// sibling modules
exports.default = getInput;