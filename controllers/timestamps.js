/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const root = "..";
// config
const conf = require(`${root}/config`);

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
* @return {Function} 				Start the timer.
**/
function start() {
	return process.hrtime();
}

/**
* Stop the timer.
*
* @method stop
* @param {Date} start				Timestamp.
* @return {String} description		Description of the time.
**/
function stop(start, description) {
	const elapsed = process.hrtime(start); // = [seconds,nanoseconds]
	description += " execution time: ";
	console.info(`${description}%ds %dms`, elapsed[0], Math.round(elapsed[1] / 1000000));
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
* @param {Number} minutes			Minutes from now.
* @param {Boolean} reversed			Positive or negative.
* @return {Date}					Now, adjusted.
**/
function minutesFromNow(minutes, reversed) {
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
