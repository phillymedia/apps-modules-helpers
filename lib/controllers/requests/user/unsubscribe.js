// DEPENDENCIES
// =============================================================================
// config
// import { debug as _debug } from "APP/config";
// third-party libraries
import { isString } from "lodash";
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the user/unsubscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab from request
	let unsubscriptions = req.input.unsubscriptions || req.input["unsubscriptions[]"];
	// if a string, make into an array
	if (isString(unsubscriptions)) {
		unsubscriptions = [unsubscriptions];
	}
	// if there are no subscriptions, whoops, abort
	if (!unsubscriptions || (unsubscriptions && !unsubscriptions.length)) {
		return next(makeError("NoUnsubscriptions", "Nothing to unsubscribe.", "Helpers getInputUserUnsubscribe", 400));
	}
	// set to req.unsubscriptions
	req.unsubscriptions = unsubscriptions;
	// next!
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
