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
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
  // grab input from the request inputu
  const { subscriber } = req.input;
  // if no parameter, abort!
  if (!subscriber || (isObject(subscriber) && isEmpty(subscriber))) {
    return next(makeError("MissingParameter", "No subscriber specified.", "helpers -> getInput", 400));
  }
  // email always required
  if (!subscriber.email) {
    return next(makeError("MissingParameter", "Email required.", "helpers -> getInput", 400));
  }
  // password always required
  if (!subscriber.password) {
    return next(makeError("MissingParameter", "Password required.", "helpers -> getInput", 400));
  }
  // save the parameter to request
  req.subscriber = subscriber;
  // continue processing
  return next();
}


// EXPORTS
// =============================================================================

export default getInput;
