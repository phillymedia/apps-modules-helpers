// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isArray, isEmpty } from "lodash";
// APP -------------------------------
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the feed/search route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
  // grab input from the request input
  const { id } = req.input;
  // if no id, or id is an empty array, abort!
  if (!id || (isArray(id) && isEmpty(id))) {
    return next(makeError("NoId", "No ID specified.", 400));
  }
  // save the id to req.id
  req.id = id;
  // continue processing
  return next();
}


// EXPORTS
// =============================================================================

export default getInput;
