// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the feed/search route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab input from the request input
	const email = req.input.email;
	// optional
	const password = req.input.password;
	// if no parameter, abort!
	if (!email) {
		return next(makeError("MissingInput", "No email specified.", 400));
	}
	// save the parameter to request
	req.email = email;
	// optional
	if (password) {
		req.password = password;
	}
	// continue processing
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
