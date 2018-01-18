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
 * Get the inputs from the user/subscribe route.
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
// third-party libraries
function getInput(req, res, next) {
	// grab termId or termName
	var _req$input = req.input,
	    termName = _req$input.termName,
	    termId = _req$input.termId;
	// make sure one or the other is set

	if (!termId && !termName) {
		return next((0, _errors.makeError)("NoTermOrName", "enter a search term to be used for the alert"));
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
 		return next(makeError("TermNameMulti", termNameMessage));
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
	return next((0, _errors.makeError)("InvalidTermName", "Invalid name."));
}

// EXPORTS
// =============================================================================

// sibling modules
exports.default = getInput;