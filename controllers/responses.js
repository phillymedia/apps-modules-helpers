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
// third-party
const _ = require("lodash");
// sibling modules
const errors = require(`${root}/controllers/errors`);
const transforms = require(`${root}/controllers/transforms`);

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
	res.setHeader("Content-Type", "application/json");
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
* @method prepSuccess
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
* @method sendSuccess
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
	sendUnauthorized,
	sendFailure,
	prepSuccess,
	sendSuccess,
	handleFailure,
	handleSuccess,
	handleRobots,
};
