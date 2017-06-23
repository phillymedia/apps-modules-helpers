"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.formatError = exports.makeError = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("../config");

var _transforms = require("./transforms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Print error to the console.
 *
 * @method printError
 * @param {error} err 				The error.
 */

// APP -------------------------------
function printError(err) {
	// prepare the error
	var printableError = "";
	// log to console in debug mode
	if (_config.debug) {
		// print to regular console to help us narrow down what call caused this
		console.log(err.statusCode + " Error occurred.");
		// basic details
		printableError += err.statusCode + " Error: ";
		// stack contains name of error, message of error, and of course stack trace
		printableError += err.stack;
		// add location if available
		if (err.loc) {
			printableError += "\nLocation: " + err.loc;
		}
		// print completed error
		if (err.warn) {
			console.error(printableError, "\nError was improperly formatted.\nOriginal error:", err.warn, "\nOriginal response: ", err.res);
		} else {
			console.error(printableError);
		}
	}
	// simplified error reporting for production
	else {
			// basic details
			console.error(err.code + ": " + err.message);
			// add warning if available
			if (err.warn) {
				console.error("Error was improperly formatted.\nOriginal error:", err.warn, "\nOriginal response:", err.res);
			}
		}
}

/**
 * Handle Mongoose-specific errors.
 *
 * @method mongooseErrorHandler
 * @param {error} err 				The error.
 * @return {error} err		 		The formatted error.
 */

// sibling modules
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function mongooseErrorHandler(err) {
	// catch mongoose validation and reformat them
	if (err instanceof _mongoose2.default.Error.ValidationError) {
		// log error as it exists
		printError(err.errors);
		// make it a standard error for returning
		return makeError("InvalidFields", (0, _transforms.safeStringify)(err.errors), "error > mongooseErrorHandler", 1100, true);
	}
	// return errors
	return err;
}

// PUBLIC -------------------------------

/**
 * Create an error for our internal use.
 *
 * @method makeError
 * @param {string} code 				The error's code, e.g. "MissingParameter".
 * @param {string} message 				The error's message, e.g. "A parameter is missing".
 * @param {string} statusCode 			The error's message, e.g. 402.
 * @param {boolean} surfaceMessage 		Should we show this to the end user?
 * @return {error} err		 			The formatted error.
 */
function makeError(code, message, loc, statusCode, surfaceMessage) {
	if (!code || !message) {
		message = "Couldn't create error.";
		code = "BadError";
		statusCode = 416;
	}
	// create a new error object, using the error as a message
	var err = new Error(message);
	// set code (e.g., "BadRequest")
	err.code = code;
	// set status code (e.g., "404")
	err.statusCode = statusCode ? err.statusCode = statusCode : 500;
	// OPTIONAL: location (e.g., "Res makeError > createError")
	if (loc) {
		err.loc = loc;
	}
	// OPTIONAL: should this message be surfaced to the end user?
	if (surfaceMessage) {
		err.surfaceMessage = true;
	}
	// error created, return it
	return err;
}

/**
 * Format an error.
 *
 * @method formatError
 * @param {error} err 				The error.
 * @param {object} res 				The response.
 * @return {error} err		 		The formatted error.
 */
function formatError(err, res) {
	if (!err) {
		// create properly-formatted but generic error
		err = makeError("UnknownError", "Something went wrong. Refer to logs.", "Error formatError", 501);
		// add res to error for additional tracking
		err.res = res;
	} else if (!err.code || !err.statusCode) {
		// mongoose error checking
		err = mongooseErrorHandler(err);
		// save err as warn
		var warn = err;
		// use specific code if one exists
		if (!err.code || err.code === "Error") {
			err.code = "UnknownError";
		}
		// use message if message exists
		if (!err.message) {
			err.message = "Something went wrong. Refer to logs.";
		}
		// use loc if loc exists
		if (!err.loc) {
			err.loc = "Error formatError";
		}
		// create properly-formatted error
		err = makeError(err.code, err.message, err.loc);
		// save original malformed error as err.warn
		err.warn = warn;
		// add res to error for additional tracking
		err.res = res;
	}
	// return error
	return err;
}

// EXPORTS
// =============================================================================

exports.makeError = makeError;
exports.formatError = formatError;