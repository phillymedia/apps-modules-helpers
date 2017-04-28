/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const root = "..";
// config
const conf = require(`${root}/config`);
// third-party libraries
const mongoose = require("mongoose");
// sibling modules
const transforms = require(`${root}/controllers/transforms`);

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* CONSTRUCTOR METHOD
* function Foo(){ // set some variables up }
*/
function Main() {
	/*
	* PUBLIC PROPERTIES
	* this.publicBar = foo;
	*/
}


/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

// ERROR HANDLING
// =============================================================================

/**
* Print error to the console.
*
* @method _printError
* @param {Object} err 				The error.
*/
function _printError(err) {
	// prepare the error
	let printableError = "";
	// log to console in debug mode
	if (_debug) {
		// print to regular console to help us narrow down what call caused this
		console.log(`${err.statusCode} Error occurred.`);
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
			console.error(printableError, "\nError was improperly formatted.\nOriginal error:", err.warn, "\nOriginal response: ", err.res);
		}
		else {
			console.error(printableError);
		}
	}
	// simplified error reporting for production
	else {
		// basic details
		console.error(`${err.code}: ${err.message}`);
		// add warning if available
		if (err.warn) {
			console.error("Error was improperly formatted.\nOriginal error:", err.warn, "\nOriginal response:", err.res);
		}
	}
}

/**
* Create an error for our internal use.
*
* @method _makeError
* @param {String} code 				The error's code, e.g. "MissingParameter".
* @param {String} message 			The error's message, e.g. "A parameter is missing".
* @param {String} statusCode 		The error's message, e.g. 402.
* @param {Bool} surfaceMessage 		Should we show this to the end user?
* @return {Object} err		 		The formatted error.
*/
function _makeError(code, message, loc, statusCode, surfaceMessage) {
	// create a new error object, using the error as a message
	const err = new Error(message);
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
* @method _handleSuccess
* @param {Object} err 				The error.
* @param {Object} res 				The response.
* @return {Object} err		 		The formatted error.
*/
function _formatError(err, res) {
	if (!err) {
		// create properly-formatted but generic error
		err = _makeError("UnknownError", "Something went wrong. Refer to logs.", "Error formatError");
		// add res to error for additional tracking
		err.res = res;
	}
	else if (!err.code || !err.statusCode) {
		// mongoose error checking
		err = _mongooseErrorHandler(err);
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
		// create properly-formatted error
		err = _makeError(err.code, err.message, err.loc);
		// save original malformed error as err.warn
		err.warn = warn;
		// add res to error for additional tracking
		err.res = res;
	}
	// return error
	return err;
}

/**
* Handle Mongoose-specific errors.
*
* @method _mongooseErrorHandler
* @param {Object} err 				The error.
* @return {Object} err		 		The formatted error.
*/
function _mongooseErrorHandler(err) {
	// catch mongoose validation and reformat them
	if (err instanceof mongoose.Error.ValidationError) {
		// log error as it exists
		_printError(err.errors);
		// make it a standard error for returning
		return _makeError("InvalidFields", transforms.safeStringify(err.errors), "error > _mongooseErrorHandler", 1100, true);
	}
	return err;
}


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// ERROR HANDLING
// =============================================================================
// construct an Error
Main.prototype.makeError = _makeError;

// ensure properly formatted error
Main.prototype.formatError = _formatError;

// mongoose error handling
Main.prototype.mongooseErrorHandler = _mongooseErrorHandler;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
