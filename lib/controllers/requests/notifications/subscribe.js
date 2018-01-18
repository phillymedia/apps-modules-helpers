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
 * Get the inputs from the notifications/subscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab input from the request input
	const { deviceToken: deviceId, userData } = req.input;
	// require device token
	if (!deviceId || !isString(deviceId)) {
		return next(makeError("NoToken", "Missing or invalid device token.", "Helpers getInputDeviceData", 400));
	}
	// userdata is optional
	if (userData && !isString(userData)) {
		return next(makeError("InvalidUserdata", "Invalid user data.", "Helpers getInputDeviceData", 400));
	}
	// if all is good, set input to request
	req.deviceId = deviceId;
	req.userData = userData;
	// next!
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
