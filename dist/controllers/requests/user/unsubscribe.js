"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 * requests/user/unsubscribe
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
 * Get the inputs from the user/unsubscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab from request
	var unsubscriptions = req.input.unsubscriptions || req.input["unsubscriptions[]"];
	// if a string, make into an array
	if ((0, _lodash.isString)(unsubscriptions)) {
		unsubscriptions = [unsubscriptions];
	}
	// if there are no subscriptions, whoops, abort
	if (!unsubscriptions || unsubscriptions && !unsubscriptions.length) {
		return next(errors.makeError("NoUnsubscriptions", "Nothing to unsubscribe.", "Helpers getInputUserUnsubscribe", 400));
	}
	// set to req.unsubscriptions
	req.unsubscriptions = unsubscriptions;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

exports.default = getInput;