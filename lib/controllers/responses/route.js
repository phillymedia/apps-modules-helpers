// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// sibling modules
import { sendFailure, sendSuccess } from "./core";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Handle successful requests.
 *
 * @param {Object} req 				The original request.
 * @param {Object} res 				The response.
 */
function handleSuccess(req, res, next) {
	return sendSuccess(req, res, next);
}

/**
 * Handle error requests.
 *
 * @param {Object} req 				The original request.
 * @param {Object} res 				The response.
 */
function handleFailure(err, req, res, next) {
	return sendFailure(err, req, res, next);
}

/**
 * Handle robot requests.
 *
 * @param {Object} req - The original request.
 * @param {Object} res - The response.
 */
function handleRobots(req, res) {
	res.type("text/plain");
	res.send("User-agent: *\nDisallow: /");
	res.end();
}


// EXPORTS
// =============================================================================

export {
	handleFailure,
	handleSuccess,
	handleRobots,
};
