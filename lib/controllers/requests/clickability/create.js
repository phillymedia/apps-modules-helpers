// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isObject, isEmpty } from "lodash";
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
	const subscriber = req.input.subscriber;
	// if no parameter, abort!
	if (!subscriber || (isObject(subscriber) && isEmpty(subscriber))) {
		return next(makeError("MissingInput", "No subscriber specified.", 400));
	}
	// save the parameter to request
	req.subscriber = subscriber;
	// continue processing
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
