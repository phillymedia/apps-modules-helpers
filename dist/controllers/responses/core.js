"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sendSuccess = exports.prepSuccess = exports.sendFailure = exports.sendUnauthorized = undefined;

var _lodash = require("lodash");

var _config = require("../../config");

var _errors = require("../errors");

var _transforms = require("../transforms");

// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Set headers if they haven't already been sent.
 *
 * @method setHeaders
 * @param {object} res
 * @param {string} contentType
 */

// sibling modules
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function setHeaders(res) {
	var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "application/json";

	if (!res.headersSent) {
		res.setHeader("Content-Type", contentType);
	}
}

// PUBLIC -------------------------------

/**
* Send a response to an unauthorized call.
*
* @method sendUnauthorized
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/

// APP -------------------------------
function sendUnauthorized(req, res) {
	setHeaders(res);
	res.status(403);
	res.send("Forbidden");
	res.end();
}

/**
* Send a response to an error.
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
	err = (0, _errors.formatError)(err, savedRes);
	// stringify input
	var input = (0, _transforms.safeStringify)({
		error: err.code,
		message: err.message,
		surfaceMessage: err.surfaceMessage
	});
	// this will either be a nice object, or a new error
	if ((0, _lodash.isError)(input)) {
		console.error("Could not stringify original error!", input.stack);
		input = (0, _transforms.safeStringify)({
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
	if (_config.debug) {
		console.log("Success!", "sent data:", res.sendData);
	}
	var input = (0, _transforms.safeStringify)(res.sendData);
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

// EXPORTS
// =============================================================================

exports.sendUnauthorized = sendUnauthorized;
exports.sendFailure = sendFailure;
exports.prepSuccess = prepSuccess;
exports.sendSuccess = sendSuccess;