/**
 * PHILLLY HELPERS
 * requests/notifications/publish
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("APP/config");
// third-party libraries
import { filter, flatten, map, isString, forOwn } from "lodash";
// sibling modules
const errors = require("COMP/errors");
// const transforms = require("COMP/transforms");

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars
const _hints = conf.sns.hints;


/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

/**
 * Get the inputs from the notifications/publish route.
 *
 * @method getInput
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


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

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
			return next(errors.makeError("MissingInput",
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


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput,
};
