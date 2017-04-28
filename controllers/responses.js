/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("@/config");
// load other helpers
const errors = require("@/controllers/errors");
const transforms = require("@/controllers/transforms");
// third-party libraries
const _ = require("lodash");

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

// SEND RESPONSES
// =============================================================================

/**
* Send a response to an unauthorized call.
*
* @method _sendUnauthorized
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/
function sendUnauthorized(req, res) {
	res.setHeader("Content-Type", "application/json");
	res.status(403);
	res.send("Forbidden");
	res.end();
}

/**
* Send a response to an errors.
*
* @method _sendFailure
* @param {Object} err 				The error, if any.
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/
function sendFailure(err, req, res, next) {
	// save the server response
	const savedRes = res;
	// ensure properly formatted error
	err = errors.formatError(err, savedRes);
	// stringify input
	let input = transforms.safeStringify({
		error: err.code,
		message: err.message,
		surfaceMessage: err.surfaceMessage,
	});
	// this will either be a nice object, or a new error
	if (_.isError(input)) {
		console.error("Could not stringify original error!", input.stack);
		input = transforms.safeStringify({
			error: input.code,
			message: input.message,
			surfaceMessage: false,
		});
	}
	if (res.headersSent) {
		return next(err);
	}
	// send error
	res.setHeader("Content-Type", "application/json");
	res.status(err.statusCode);
	res.send(input);
	res.end();
}

/**
* Prepare a successful response.
*
* @method _prepSuccess
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/
function prepSuccess(req, res, next) {
	const sentData = res.sendData;
	// set up the data
	res.sendData = { success: true, data: sentData };
	// next!
	return next();
}

/**
* Send a successful response.
*
* @method _sendSuccess
* @param {Object} res 				The response.
* @param {Object} sendData 			The data.
*/
function sendSuccess(req, res, next) {
	if (_debug) {
		console.log("Success!", "sent data:", res.sendData);
	}
	const input = transforms.safeStringify(res.sendData);
	if (_.isError(input)) {
		console.error("Could not send success!", input.stack);
		return sendFailure(input, req, res, next);
	}
	// send success
	res.setHeader("Content-Type", "application/json");
	res.status(200);
	res.send(input);
	res.end();
}

// ROUTE FUNCTIONS
// =============================================================================

/**
* Handle successful requests.
*
* @method _handleSuccess
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function handleSuccess(req, res, next) {
	return sendSuccess(req, res, next);
}

/**
* Handle error requests.
*
* @method _handleFailure
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function handleFailure(err, req, res, next) {
	return sendFailure(err, req, res, next);
}

/**
* Handle robot requests.
*
* @method _handleRobots
* @param {Object} req 				The original request.
* @param {Object} res 				The response.
*/
function handleRobots(req, res) {
	res.type("text/plain");
	res.send("User-agent: *\nDisallow: /");
	res.end();
}


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// SEND RESPONSES
// =============================================================================
// the user is not authorized!
Main.prototype.sendUnauthorized = sendUnauthorized;

// the operation failed in some way, send a response
Main.prototype.sendFailure = sendFailure;

// the operation succeeded, prepare a successful response
Main.prototype.prepSuccess = prepSuccess;

// the operation succeeded, send a response
Main.prototype.sendSuccess = sendSuccess;


// ROUTE FUNCTIONS
// =============================================================================
// disallow search engine crawlers
Main.prototype.handleRobots = handleRobots;

// middleware for sending success messages
Main.prototype.handleSuccess = handleSuccess;

// middleware for sending failure messages
Main.prototype.handleFailure = handleFailure;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
