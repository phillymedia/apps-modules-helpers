/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const conf = require("APP/config");

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

// DEVICE -------------------------------
/*
var _AndroidClient = global.nconf.get("ClientUserAgentHint:Android");
var _iOSClient = global.nconf.get("ClientUserAgentHint:iOS");
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

/**
* Start the timer.
*
* @method start
* @return {Function} 					Start the timer.
**/
function start() {
	return process.hrtime();
}

/**
* Stop the timer.
*
* @method stop
* @param {array} currStart				Timestamp.
* @param {string} description			A short description of the timer.
* @return {object}						An object that can be used to display the time elapse.
**/
function stop(currStart, description) {
	if (!currStart || !description) {
		throw new Error("Bad arguments!");
	}
	// process the currStart array
	const elapsed = process.hrtime(currStart); // = [seconds, nanoseconds]
	// create a timer description object
	const timerDescription = {
		description,
		s: elapsed[0],
		ms: Math.round(elapsed[1] / 1000000),
	};
	// add the formatted string
	timerDescription.formatted = `${description} (execution time: ${timerDescription.s}s ${timerDescription.ms}ms`;
	// return the object
	return timerDescription;
}

/**
* Now.
*
* @method now
* @return {Date}		Description of the time.
**/
function now() {
	// date
	return new Date();
}

/**
* Adds or substracts minutes from now().
*
* @method minutesFromNow
* @param {Number} minutes			Minutes from now (defaults to 0).
* @param {Boolean} reversed			Positive or negative.
* @return {Date}					Now, adjusted.
**/
function minutesFromNow(minutes = 0, reversed = false) {
	// date
	const currentTime = now();
	// set minutes
	minutes = currentTime.getMinutes() + Number((reversed ? "-" : "") + minutes);
	// adjust date
	currentTime.setMinutes(minutes);
	// return date
	return currentTime;
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	start,
	stop,
	now,
	minutesFromNow,
};
