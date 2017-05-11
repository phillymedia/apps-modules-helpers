/**
 * PHILLLY HELPERS
 * request module
 * Hopefully reusable class of functions.
 */
/* eslint-disable */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("APP/config");
// third-party libraries
import { attempt, isEmpty, isError, isObject, forEach, forOwn, unset } from "lodash";
// sibling modules
const errors = require("COMP/errors");
const transforms = require("COMP/transforms");


// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

// PARSE INPUT
// =============================================================================

/**
 * Peel off input from params, body, query, and raw body.
 *
 * @method buildInput
 * @param {object} req
 * @return {object}
 */
function buildInput(req) {
	// set up variables
	const input = {};
	let loopable;
	// if everything else is empty but rawBody exists
	if ((isEmpty(req.params) && isEmpty(req.body) && isEmpty(req.query)) && req.rawBody) {
		// log, if debugging
		if (_debug) {
			console.log("Using raw body.");
		}
		// safely parse the raw body
		loopable = transforms.safeParse(req.rawBody);
		// check if error
		if (isError(loopable)) {
			return loopable;
		}
		// otherwise
		loopable = [loopable];
	}
	// otherwise, assume content
	else {
		// check for req.body.userAgent;
		if (!isEmpty(req.body) && req.body.userAgent) {
			unset(req.body, ["userAgent"]);
		}
		// set up loopable
		loopable = [req.params, req.body, req.query];
	}
	// loop through input
	forEach(loopable, (currInput) => {
		// get input
		currInput = transforms.safeParse(currInput);
		// error?
		if (isError(currInput)) {
			throw errors.makeError("InvalidRequest",
				`Invalid request input:${transforms.safeStringify(input)}`,
				"Helpers buildInput > transforms.safeParse",
				400);
		}
		// make sure it has content
		if (inputHasContent(currInput)) {
			forOwn(currInput, (value, key) => {
				input[key] = value;
			});
		}
	});
	// make sure input has at least some content
	if (isEmpty(input)) {
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
function inputHasContent(input) {
	// array/object? and not empty?
	return (input && isObject(input) && !isEmpty(input));
}


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// needed for most routes
function standardizeInput(req, res, next) {
	// attempt _buildInput
	const input = attempt(buildInput, req);
	// an error has occurred while parsing
	if (isError(input)) {
		return next(input);
	}
	// no input at all
	if (!input) {
		return next(errors.makeError("NoContent", "Empty request.", "Helpers standardizeInput", 400));
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
	const contentType = req.headers["content-type"] || "";
	const mime = contentType.split(";")[0];
	if (mime !== "text/plain") {
		return next();
	}
	// stream through the raw data stream to pull the raw body
	let data = "";
	req.setEncoding("utf8");
	req.on("data", (chunk) => {
		data += chunk;
	});
	// for a return value?
	return req.on("end", () => {
		req.rawBody = data;
		next();
	});
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	standardizeInput,
	getRawBody,
};
