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
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
  // grab input from the request input
  const { email, password, username } = req.input;
  // if no parameter, abort!
  // users require emails even if they are being created from usernames
  if (!email && !username) {
    return next(makeError("MissingParameter", "User identifier required.", "helpers -> getInput", 400));
  }
  // required
  if (username) {
    req.username = username;
  }
  else {
    // save the parameter to request
    req.email = email;
  }
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
