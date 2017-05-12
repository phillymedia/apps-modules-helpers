"use strict";

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
var conf = require("../config");
// third-party libraries

// sibling modules
var errors = require("./errors");
var transforms = require("./transforms");

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

/**
 * Set headers if they haven't already been sent.
 *
 * @method setHeaders
 * @param {object} res
 * @param {string} contentType
 */
function setHeaders(res) {
	var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "application/json";

	if (!res.headersSent) {
		res.setHeader("Content-Type", contentType);
	}
}

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// SEND RESPONSES
// =============================================================================

/**
* Send a response to an unauthorized call.
*
* @method sendUnauthorized
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/
function sendUnauthorized(req, res) {
	setHeaders(res);
	res.status(403);
	res.send("Forbidden");
	res.end();
}

/**
* Send a response to an errors.
*
* @method sendFailure
* @param {Object} err 				The error, if any.
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function sendFailure(err, req, res) {
	// save the server response
	var savedRes = res;
	// ensure properly formatted error
	err = errors.formatError(err, savedRes);
	// stringify input
	var input = transforms.safeStringify({
		error: err.code,
		message: err.message,
		surfaceMessage: err.surfaceMessage
	});
	// this will either be a nice object, or a new error
	if ((0, _lodash.isError)(input)) {
		console.error("Could not stringify original error!", input.stack);
		input = transforms.safeStringify({
			error: input.code,
			message: input.message,
			surfaceMessage: false
		});
	}
	// send error
	setHeaders(res);
	res.status(err.statusCode);
	res.send(input);
	res.end();
}

/**
* Prepare a successful response.
*
* @method prepSuccess
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/
function prepSuccess(req, res, next) {
	// grab sendData
	var sentData = res.sendData;
	// set up the data
	res.sendData = { success: true, data: sentData };
	// next!
	return next();
}

/**
* Send a successful response.
*
* @method sendSuccess
* @param {Object} res 				The response.
* @param {Object} sendData 			The data.
*/
function sendSuccess(req, res) {
	// eslint-disable-line consistent-return
	// res.sendData = { data: "some kind of data" };
	if (_debug) {
		console.log("Success!", "sent data:", res.sendData);
	}
	var input = transforms.safeStringify(res.sendData);
	// unset(res, "sendData");
	if ((0, _lodash.isError)(input)) {
		console.error("Could not send success!", input.stack);
		return sendFailure(input, req, res);
	}
	// send success
	setHeaders(res);
	res.status(200);
	res.send(input);
	res.end();
}

// ROUTE FUNCTIONS
// =============================================================================

/**
* Handle successful requests.
*
* @method handleSuccess
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function handleSuccess(req, res, next) {
	return sendSuccess(req, res, next);
}

/**
* Handle error requests.
*
* @method handleFailure
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function handleFailure(err, req, res, next) {
	return sendFailure(err, req, res, next);
}

/**
* Handle robot requests.
*
* @method handleRobots
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function handleRobots(req, res) {
	res.type("text/plain");
	res.send("User-agent: *\nDisallow: /");
	res.end();
}

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	sendUnauthorized: sendUnauthorized,
	sendFailure: sendFailure,
	prepSuccess: prepSuccess,
	sendSuccess: sendSuccess,
	handleFailure: handleFailure,
	handleSuccess: handleSuccess,
	handleRobots: handleRobots
};