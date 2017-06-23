"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRawBody = exports.standardizeInput = undefined;

var _lodash = require("lodash");

var _config = require("../../config");

var _errors = require("../errors");

var _transforms = require("../transforms");

// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Peel off input from params, body, query, and raw body.
 *
 * @method buildInput
 * @param {object} req
 * @return {object}
 */

// sibling modules
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function buildInput(req) {
	// set up variables
	var input = {};
	var loopable = void 0;
	// if everything else is empty but rawBody exists
	if ((0, _lodash.isEmpty)(req.params) && (0, _lodash.isEmpty)(req.body) && (0, _lodash.isEmpty)(req.query) && req.rawBody) {
		// log, if debugging
		if (_config.debug) {
			console.log("Using raw body.");
		}
		// safely parse the raw body
		loopable = (0, _transforms.safeParse)(req.rawBody);
		// check if error
		if ((0, _lodash.isError)(loopable)) {
			return loopable;
		}
		// otherwise
		loopable = [loopable];
	}
	// otherwise, assume content
	else {
			// check for req.body.userAgent;
			if (!(0, _lodash.isEmpty)(req.body) && req.body.userAgent) {
				(0, _lodash.unset)(req.body, ["userAgent"]);
			}
			// set up loopable
			loopable = [req.params, req.body, req.query];
		}
	// loop through input
	(0, _lodash.forEach)(loopable, function (currInput) {
		// get input
		currInput = (0, _transforms.safeParse)(currInput);
		// error?
		if ((0, _lodash.isError)(currInput)) {
			throw (0, _errors.makeError)("InvalidRequest", "Invalid request input:" + (0, _transforms.safeStringify)(input), "Helpers buildInput > safeParse", 400);
		}
		// make sure it has content
		if (inputHasContent(currInput)) {
			(0, _lodash.forOwn)(currInput, function (value, key) {
				input[key] = value;
			});
		}
	});
	// make sure input has at least some content
	if ((0, _lodash.isEmpty)(input)) {
		return false;
	}
	// return input
	return input;
}

/**
 * Does input have content?
 *
 * @method inputHasContent
 * @param {object} input
 * @return {boolean}
 */

// APP -------------------------------
function inputHasContent(input) {
	// array/object? and not empty?
	return input && (0, _lodash.isObject)(input) && !(0, _lodash.isEmpty)(input);
}

// PUBLIC -------------------------------

/**
 * Needed for most routes.
 *
 * @method standardizeInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function standardizeInput(req, res, next) {
	// attempt buildInput
	var input = (0, _lodash.attempt)(buildInput, req);
	// an error has occurred while parsing
	if ((0, _lodash.isError)(input)) {
		return next(input);
	}
	// no input at all
	if (!input) {
		return next((0, _errors.makeError)("NoContent", "Empty request.", "Helpers standardizeInput", 400));
	}
	// otherwise, set to req.input
	req.input = input;
	// next!
	return next();
}

/**
 * Get the raw body.
 *
 * @method getRawBody
 * @param {object} req 				The original request.
 * @param {object} res 				The response.
 * @returns {object}
 */
function getRawBody(req, res, next) {
	// check content type to make sure it contains text/plain
	var contentType = req.headers["content-type"] || "";
	var mime = contentType.split(";")[0];
	if (mime !== "text/plain") {
		return next();
	}
	// stream through the raw data stream to pull the raw body
	var data = "";
	req.setEncoding("utf8");
	req.on("data", function (chunk) {
		data += chunk;
	});
	// for a return value?
	return req.on("end", function () {
		req.rawBody = data;
		next();
	});
}

// EXPORTS
// =============================================================================

exports.standardizeInput = standardizeInput;
exports.getRawBody = getRawBody;