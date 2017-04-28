/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("@/config");
// third-party libraries
const _ = require("lodash"); // eslint-disable-line no-unused-vars

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* CONSTRUCTOR METHOD
* function Foo(){ // set some variables up }
*/

function Main() {
	/*
	* PUBLIC PROPERTIES
	* this.publicBar = foo;
	*/
}


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

/**
* Start the timer.
*
* _start
* @return {Function} 				Start the timer.
**/
function _start() {
	return process.hrtime();
}

/**
* Stop the timer.
*
* _stop
* @param {Date} start				Timestamp.
* @return {String} description		Description of the time.
**/
function _stop(start, description) {
	const elapsed = process.hrtime(start); // = [seconds,nanoseconds]
	description += " execution time: ";
	console.info(`${description}%ds %dms`, elapsed[0], Math.round(elapsed[1] / 1000000));
}

/**
* Now.
*
* _now
* @return {Date}		Description of the time.
**/
function _now() {
	// date
	return new Date();
}

/**
* Adds or substracts minutes from _now.
*
* _minutesFromNow
* @param {Number} minutes			Minutes from now.
* @param {Boolean} reversed			Positive or negative.
* @return {Date}					Now, adjusted.
**/
function _minutesFromNow(minutes, reversed) {
	// date
	const now = _now();
	// set minutes
	minutes = now.getMinutes() + Number((reversed ? "-" : "") + minutes);
	// adjust date
	now.setMinutes(minutes);
	// return date
	return now;
}


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// TIMERS
// =============================================================================
// time a given function
Main.prototype.start = _start;
Main.prototype.stop = _stop;
// manipulate a date
Main.prototype.now = _now;
Main.prototype.minutesFromNow = _minutesFromNow;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
