// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isString } from "lodash";
// APP -------------------------------
// sibling modules
import { makeError } from "COMP/errors";
// const transforms = require("COMP/transforms");


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
function getInput(req, res, next) {
	// grab input from the request input
	const search = req.input.search;
	// if no id, abort!
	if (!search || !isString(search)) {
		return next(makeError("NoSearchTerm", "No key words specified.", 400));
	}
	// save the id to req.id
	req.search = search;
	// more options
	req.diag = req.input.diag || null;
	req.adv = req.input.adv || null;
	req.fields = req.input.fields || null;
	req.pageSize = req.input.pageSize || null;
	req.queryType = req.input.queryType || null;
	req.sites = req.input.sites || null;
	req.sortBy = req.input.sortBy || null;
	// continue processing
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
