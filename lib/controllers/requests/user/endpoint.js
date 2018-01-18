/**
 * PHILLLY HELPERS
 * requests/user/endpoint
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// third-party libraries
import { isString } from "lodash";
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the user/endpoint route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab from request
	const { email_old: emailOld, email_new: emailNew } = req.input;
	// error if missing
	if (!emailOld || !isString(emailOld)) {
		return next(makeError("NoEmail", "Missing or invalid emailOld.", "Helpers getInputUserEndpoint", 400));
	}
	if (!emailNew || !isString(emailNew)) {
		return next(makeError("NoEmail", "Missing or invalid emailNew.", "Helpers getInputUserEndpoint", 400));
	}
	// set to request
	req.email_old = emailOld;
	req.email_new = emailNew;
	// next!
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
