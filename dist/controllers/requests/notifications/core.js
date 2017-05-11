"use strict";

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 * requests/notifications/core
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
var conf = require("../../../config");
// third-party libraries

// sibling modules
var errors = require("../../errors");
// const transforms = require("COMP/transforms");


// CONFIG -------------------------------
var _debug = conf.debug; // eslint-disable-line no-unused-vars
var _hints = conf.sns.hints;

/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

var _sportsNow = conf.sns.cats.sportsNow;
var _phillyCom = conf.sns.cats.phillyCom;

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
	var isSportsNow = false;
	var isPhillyCom = false; // eslint-disable-line no-unused-vars

	// ensure hint is an array
	if (subHints && (0, _lodash.isString)(subHints)) {
		subHints = [subHints];
		unsubHints = false;
	}
	// or false, if an empty array (which is truthy)
	else if ((0, _lodash.isArray)(subHints) && (0, _lodash.isEmpty)(subHints)) {
			subHints = false;
		}

	// to return the data
	var appData = {
		appHint: "",
		subHints: [],
		unsubHints: []
	};

	// find currHint
	var currHint = (0, _lodash.find)(_hints, function (hint) {
		// skip hints that don't match
		if (userAgent.indexOf(hint.userAgent) === -1) {
			return false;
		}
		appData.appHint = hint.appHint;
		subHints = subHints || hint.termHint;
		if (userAgent.indexOf(_sportsNow) === 0) {
			isSportsNow = true;
		} else if (userAgent.indexOf(_phillyCom) === 0) {
			isPhillyCom = true;
		}
		return true;
	});

	// no hint found? error!
	if (!appData.appHint) {
		return false;
	}

	// empty?
	if (!(0, _lodash.isEmpty)(subHints)) {
		// array
		if ((0, _lodash.isArray)(subHints)) {
			// add hints
			appData.subHints = (0, _lodash.map)(subHints, function (hint) {
				return hint + (isSportsNow ? currHint.osPostfix : "");
			});
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
	if (!(0, _lodash.isEmpty)(unsubHints)) {
		// array
		if ((0, _lodash.isArray)(unsubHints)) {
			// add hints
			appData.unsubHints = (0, _lodash.map)(unsubHints, function (hint) {
				return hint + (isSportsNow ? currHint.osPostfix : "");
			});
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
	var userAgent = req.headers["user-agent"];
	var subHint = void 0;
	var unsubHint = void 0;
	// use singular topic if it exists
	if (req.input.topic) {
		if ((0, _lodash.isString)(req.input.topic)) {
			subHint = req.input.topic;
		}
		// use object if it exists
		else if ((0, _lodash.isObject)(req.input.topic)) {
				// now arrays
				subHint = [];
				unsubHint = [];
				// add true values to subscribe array, false values to unsubscribe array
				(0, _lodash.forEach)(req.input.topic, function (value, key) {
					if (req.input.topic[key]) {
						subHint.push(key);
					} else {
						unsubHint.push(key);
					}
				});
			}
	}
	// grab data
	var hints = getHints(userAgent, subHint, unsubHint);
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
	getInput: getInput
};