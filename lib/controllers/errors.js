// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import mongoose from "mongoose";
import { includes, isNumber } from "lodash";
// APP -------------------------------
import { debug as _debug, clickability } from "APP/config";
// sibling modules
import { log } from "COMP/logging";
import { safeStringify } from "COMP/transforms";


// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Print error to the log.
 *
 * @param {error} err - The error.
 */
function printError(err) {
	// prepare the error
	let printableError = "";
	// log to console in debug mode
	if (_debug) {
		// print to regular console to help us narrow down what call caused this
		log.info(`${err.statusCode} Error occurred.`);
		// basic details
		printableError += `${err.statusCode} Error: `;
		// stack contains name of error, message of error, and of course stack trace
		printableError += err.stack;
		// add location if available
		if (err.loc) {
			printableError += `\nLocation: ${err.loc}`;
		}
		// print completed error
		if (err.warn) {
			log.error(printableError, "\nError was improperly formatted.\nOriginal error:", err.warn, "\nOriginal response: ", err.res);
		}
		else {
			log.error(printableError);
		}
	}
	// simplified error reporting for production
	else {
		// basic details
		log.error(`${err.code}: ${err.message}`);
		// add warning if available
		if (err.warn) {
			log.error("Error was improperly formatted.\nOriginal error:", err.warn, "\nOriginal response:", err.res);
		}
	}
}

/**
 * Handle Mongoose-specific errors.
 *
 * @param {error} err - The error.
 * @return {error}
 */
function mongooseErrorHandler(err) {
	// catch mongoose validation and reformat them
	if (err instanceof mongoose.Error.ValidationError) {
		// log error as it exists
		printError(err.errors);
		// make it a standard error for returning
		return makeError("InvalidFields", safeStringify(err.errors), "error > mongooseErrorHandler", 1100, true);
	}
	// return all other errors
	return err;
}

/**
 * Handle SOAP errors.
 *
 * @param {error} err - The error.
 * @return {error}
 */
function soapErrorHandler(err) {
	// catch SOAP errors and reformat them
	if (includes(err.message, "soap:Server")) {
		// craft standard errors
		// bad credentials
		if (includes(err.message, clickability.errors.badCredentials)) {
			// make it a standard error for returning
			return makeError("BadCredentials", "Cannot log into API.", "error > soapErrorHandler", 2100, true);
		}
		// duplicate user
		if (includes(err.message, clickability.errors.duplicateUser)) {
			// make it a standard error for returning
			return makeError("UserExists", "Cannot create new subscriber with those parameters.", "error > soapErrorHandler", 2200, true);
		}
		// no user
		if (includes(err.message, clickability.errors.incomplete)
				|| includes(err.message, clickability.errors.noResults)) {
			// make it a standard error for returning
			return makeError("NoUser", "Cannot find a subscriber for those parameters.", "error > soapErrorHandler", 2300, true);
		}
		// otherwise...
		return makeError("SoapFault", `There is a problem with that request. ${err}`, "error > soapErrorHandler", 2900, true);
	}
	// return all other errors
	return err;
}


// PUBLIC -------------------------------

/**
 * Create an error for our internal use.
 *
 * @param {string} code - The error's code, e.g. "MissingParameter".
 * @param {string} message - The error's message, e.g. "A parameter is missing".
 * @param {string} statusCode - The error's message, e.g. 402.
 * @param {boolean} surfaceMessage - Should we show this to the end user?
 * @return {error}
 */
function makeError(code, message, loc, statusCode, surfaceMessage) {
	// special errors
	if (!code || !message) {
		message = "Couldn't create error.";
		code = "BadError";
		statusCode = 416;
	}
	// create a new error object, using the error as a message
	const err = new Error(message);
	// set code (e.g., "BadRequest")
	err.code = code;
	// set status code (e.g., "404")
	err.statusCode = statusCode ? err.statusCode = statusCode : 500;
	// OPTIONAL: location (e.g., "Res makeError > createError")
	if (loc) {
		err.loc = loc;
		// might sometimes be a status code due to out of date code
		if (isNumber(loc)) {
			err.statusCode = loc;
			err.loc = "";
		}
	}
	// OPTIONAL: should this message be surfaced to the end user?
	// only used by front end
	if (surfaceMessage) {
		err.surfaceMessage = true;
	}
	// error created, return it
	return err;
}

/**
 * Format an error.
 *
 * @param {error} err - The error.
 * @param {object} res - The response.
 * @return {error}
 */
function formatError(err, res) {
	if (!err) {
		// create properly-formatted but generic error
		err = makeError("UnknownError", "Something went wrong. Refer to logs.", "Error formatError", 501);
		// add res to error for additional tracking
		err.res = res;
	}
	else if (!err.code || !err.statusCode) {
		// mongoose error checking
		err = mongooseErrorHandler(err);
		// soap error checking
		err = soapErrorHandler(err);
		// save err as warn
		const warn = err;
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
		// might sometimes be a status code due to out of date code
		else if (isNumber(err.loc)) {
			err.statusCode = err.loc;
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

export {
	makeError,
	formatError,
};
