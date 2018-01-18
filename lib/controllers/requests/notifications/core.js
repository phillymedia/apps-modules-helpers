// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isString, isEmpty, find, map, isArray, isObject, forEach } from "lodash";
// APP -------------------------------
// config
import { sns as _sns } from "APP/config";
// sibling modules
import { makeError } from "COMP/errors";


// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

const _hints = _sns.hints;
const _sportsNow = _sns.cats.sportsNow;
const _phillyCom = _sns.cats.phillyCom;


// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Turn the hints from our data into the expected information for AWS.
 *
 * @method getHints
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getHints(userAgent, subHints, unsubHints) {
	let isSportsNow = false;
	let isPhillyCom = false; // eslint-disable-line no-unused-vars

	// ensure hint is an array
	if (subHints && isString(subHints)) {
		subHints = [subHints];
		unsubHints = false;
	}
	// or false, if an empty array (which is truthy)
	else if (isArray(subHints) && isEmpty(subHints)) {
		subHints = false;
	}

	// to return the data
	const appData = {
		appHint: "",
		subHints: [],
		unsubHints: [],
	};

	// find currHint
	const currHint = find(_hints, (hint) => {
		// skip hints that don't match
		if (userAgent.indexOf(hint.userAgent) === -1) {
			return false;
		}
		appData.appHint = hint.appHint;
		subHints = subHints || hint.termHint;
		if (userAgent.indexOf(_sportsNow) === 0) {
			isSportsNow = true;
		}
		else if (userAgent.indexOf(_phillyCom) === 0) {
			isPhillyCom = true;
		}
		return true;
	});

	// no hint found? error!
	if (!appData.appHint) {
		return false;
	}

	// empty?
	if (!isEmpty(subHints)) {
		// array
		if (isArray(subHints)) {
			// add hints
			appData.subHints = map(subHints, hint => hint + (isSportsNow ? currHint.osPostfix : ""));
		}
		// just a string, so add it as one
		else {
			appData.subHints.push(subHints);
		}
	}
	// set to false
	else {
		appData.subHints = false;
	}

	// empty?
	if (!isEmpty(unsubHints)) {
		// array
		if (isArray(unsubHints)) {
			// add hints
			appData.unsubHints = map(unsubHints, hint => hint + (isSportsNow ? currHint.osPostfix : ""));
		}
		// just a string, so add it as one
		else {
			appData.unsubHints.push(unsubHints);
		}
	}
	// set to false
	else {
		appData.unsubHints = false;
	}
	// return fully constructed appData
	return appData;
}


// PUBLIC -------------------------------

/**
 * Get input from the notifications route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// run a helpers function to cleanly and simply turn the useragent into a
	// req.body parameter, which can then be used by notifications
	const { "user-agent": userAgent } = req.headers;
	let subHint;
	let unsubHint;
	// use singular topic if it exists
	if (req.input.topic) {
		if (isString(req.input.topic)) {
			subHint = req.input.topic;
		}
		// use object if it exists
		else if (isObject(req.input.topic)) {
			// now arrays
			subHint = [];
			unsubHint = [];
			// add true values to subscribe array, false values to unsubscribe array
			forEach(req.input.topic, (value, key) => {
				if (req.input.topic[key]) {
					subHint.push(key);
				}
				else {
					unsubHint.push(key);
				}
			});
		}
	}
	// grab data
	const hints = getHints(userAgent, subHint, unsubHint);
	// check to make sure data is set
	if (!hints) {
		return next(makeError("InvalidRequest", "Unauthorized access."));
	}
	// if all is good, set input to request
	req.appHint = hints.appHint;
	req.subHints = hints.subHints;
	req.unsubHints = hints.unsubHints;
	// next!
	return next();
}


// EXPORTS
// =============================================================================

export default getInput;
