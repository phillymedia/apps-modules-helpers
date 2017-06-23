"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 * requests/user/endpoint
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
 * Get the inputs from the user/endpoint route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab from request
	var emailOld = req.input.email_old;
	var emailNew = req.input.email_new;
	// error if missing
	if (!emailOld || !(0, _lodash.isString)(emailOld)) {
		return next(errors.makeError("NoEmail", "Missing or invalid emailOld.", "Helpers getInputUserEndpoint", 400));
	}
	if (!emailNew || !(0, _lodash.isString)(emailNew)) {
		return next(errors.makeError("NoEmail", "Missing or invalid emailNew.", "Helpers getInputUserEndpoint", 400));
	}
	// set to request
	req.email_old = emailOld;
	req.email_new = emailNew;
	// next!
	return next();
}

// EXPORTS
// =============================================================================

exports.default = getInput;