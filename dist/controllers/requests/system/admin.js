"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInputDelete = exports.getInput = undefined;

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 * requests/system/admin
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
var conf = require("../../../config");
// third-party libraries

// sibling modules
var errors = require("../../errors");
var transforms = require("../../transforms");

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
 * Get the inputs from the system/admin route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab item
	var item = req.input.item;
	// if no item, abort!
	if (!item) {
		return next(errors.makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = transforms.safeParse(req.input.item);
	// error?
	if ((0, _lodash.isError)(item)) {
		return next(errors.makeError("InvalidRequest", "Invalid request input:" + transforms.safeStringify(req.input), "Helpers getInputAdmin > transforms.safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next(errors.makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
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
function getInputDelete(req, res, next) {
	// grab item
	var item = req.input.item;
	// if no item, abort!
	if (!item) {
		return next(errors.makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = transforms.safeParse(req.input.item);
	// error?
	if ((0, _lodash.isError)(item)) {
		return next(errors.makeError("InvalidRequest", "Invalid request input:" + transforms.safeStringify(req.input), "Helpers getInputAdmin > transforms.safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next(errors.makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
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