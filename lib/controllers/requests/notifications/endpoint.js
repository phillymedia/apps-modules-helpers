// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the notifications/endpoint route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
  // grab input from the request body
  const { deviceUsername: username, deviceToken: token } = req.input;
  // make sure one or the other actually has content
  if (!username && !token) {
    return next(makeError("NoUsernameOrToken", "Missing both username and token.", "Helpers getInputDeviceEndpoint", 400));
  }
  // optional device switch setting
  const deviceSwitch = req.input.deviceSwitch ? "true" : "false";
  // if all is good, set input to request
  req.endpointHint = { username, token };
  req.deviceSwitch = deviceSwitch;
  // next!
  return next();
}


// EXPORTS
// =============================================================================

export default getInput;
