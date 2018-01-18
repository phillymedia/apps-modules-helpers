// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isString } from "lodash";
// APP -------------------------------
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the user route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab from the request
	const { user } = req.input || req;
	// error if missing
	if (!user || !isString(user)) {
		return next(makeError("NoUser", "Missing or invalid user.", "Helpers getInputUser", 400));
	}
	// set to request
	req.user = user;
	// next!
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
