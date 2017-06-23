"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 * requests/user/subscribe
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
 * Get the inputs from the user/subscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab termId or termName
	var termName = req.input.termName;
	var termId = req.input.termId;
	// make sure one or the other is set
	if (!termId && !termName) {
		return next(errors.makeError("NoTermOrName", "enter a search term to be used for the alert"));
	}
	// if termId is set and valid
	if (termId && (0, _lodash.isString)(termId)) {
		// set to request
		req.termId = termId;
		// next!
		return next();
	}
	/*
 // if termName is a string
 else if (isString(termName)) {
 	const termNameMessages = [];
 	let termNameMessage;
 	if (termName.length > 256) {
 		termNameMessages.push({
 			error: "TermNameTooLong",
 			message: "make sure your search term is no more than 256 characters long",
 		});
 	}
 	if (sns.isReservedTerm(_typeUser, termName)) {
 		termNameMessages.push({
 			error: "TermNameReserved",
 			message: "remove the system-reserved prefix from the beginning of your search term",
 		});
 	}
 	if (!isEmpty(termNameMessages)) {
 		termNameMessage = transforms.safeStringify(termNameMessages);
 		if (isError(termNameMessage)) {
 			return next(termNameMessage);
 		}
 		return next(errors.makeError("TermNameMulti", termNameMessage));
 	}
 	// create term or get term by termName, get termId, then move on
 	sns.createTerm(_typeUser, _source, termName, (err, termId) => {
 		// handle errors
 		if (err) {
 			return next(err);
 		}
 		// otherwise
 		req.termId = termId;
 		// next!
 		return next(err);
 	});
 }
 */
	// otherwise, error
	return next(errors.makeError("InvalidTermName", "Invalid name."));
}

// EXPORTS
// =============================================================================

exports.default = getInput;