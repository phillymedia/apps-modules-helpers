/**
 * PHILLLY HELPERS
 * requests/notifications/core
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const conf = require("APP/config");
// third-party libraries
import { isString, isEmpty, find, map, isArray, isObject, forEach } from "lodash";
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

const _sportsNow = conf.sns.cats.sportsNow;
const _phillyCom = conf.sns.cats.phillyCom;

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

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
			appData.unsubHints = map(unsubHints,
				hint => hint + (isSportsNow ? currHint.osPostfix : ""));
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


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

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
	const userAgent = req.headers["user-agent"];
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
		return next(errors.makeError("InvalidRequest", "Unauthorized access."));
	}
	// if all is good, set input to request
	req.appHint = hints.appHint;
	req.subHints = hints.subHints;
	req.unsubHints = hints.unsubHints;
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
