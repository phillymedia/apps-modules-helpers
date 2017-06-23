// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { filter, flatten, map, isString, forOwn } from "lodash";
// APP -------------------------------
import { sns as _sns } from "APP/config";
// sibling modules
import { makeError } from "COMP/errors";

// CONFIG -------------------------------
const _hints = _sns.hints;


// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Get the inputs from the notifications/publish route.
 *
 * @method getHints
 * @param {string} targetHint
 * @returns {array}
 */
function getHints(targetHint) {
	// define variables
	let termHints;
	// get hints array
	const hints = filter(_hints, currHint => currHint.targetHint === targetHint);
	// return a flat map of terms
	return flatten(map(hints, (currHint) => {
		termHints = currHint.termHint;
		// add singular hint
		if (isString(termHints)) {
			return currHint.termHint;
		}
		// handle arrays

		return map(termHints,
			hint => hint + (targetHint === "sportscombo" ? currHint.osPostfix : ""));
	}));
}


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
	const input = {
		id: req.input.id,
		deviceSubject: req.input.subject,
		deviceMessage: req.input.message,
		termHints: req.input.target,
	};
	// loop through, adding to the request
	forOwn(input, (value, key) => { 	// eslint-disable-line consistent-return
		// subject is optional, everything else is not
		if (!value && key !== "deviceSubject") {
			return next(makeError("MissingInput",
				`Missing ${key} in request input.`, "Helpers getInputDeviceSend", 400));
		}
		// special handling for term hint
		if (key === "termHints") {
			// save original value to the request
			req.originalTarget = value;
			// transform it
			value = getHints(value);
			if (isString(value)) {
				value = [value];
			}
		}
		// add to the request
		req[key] = value;
	});
	// next!
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
