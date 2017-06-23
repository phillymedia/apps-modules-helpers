"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
// METHODS
// =============================================================================
// PUBLIC -------------------------------

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
	var elapsed = process.hrtime(currStart); // = [seconds, nanoseconds]
	// create a timer description object
	var timerDescription = {
		description: description,
		s: elapsed[0],
		ms: Math.round(elapsed[1] / 1000000)
	};
	// add the formatted string
	timerDescription.formatted = description + " (execution time: " + timerDescription.s + "s " + timerDescription.ms + "ms";
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
function minutesFromNow() {
	var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	// date
	var currentTime = now();
	// set minutes
	minutes = currentTime.getMinutes() + Number((reversed ? "-" : "") + minutes);
	// adjust date
	currentTime.setMinutes(minutes);
	// return date
	return currentTime;
}

// EXPORTS
// =============================================================================

exports.start = start;
exports.stop = stop;
exports.now = now;
exports.minutesFromNow = minutesFromNow;