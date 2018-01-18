// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Start the timer.
 *
 * @return {function}
 */
function start() {
	return process.hrtime();
}

/**
 * Stop the timer.
 *
 * @param {array} currStart - Timestamp.
 * @param {string} description - A short description of the timer.
 * @return {object}
 */
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
 * Wrapper for now.
 *
 * @return {date}
 */
function now() {
	// date
	return new Date();
}

/**
 * Adds or substracts minutes from now().
 *
 * @method minutesFromNow
 * @param {number} minutes - Minutes from now (defaults to 0).
 * @param {boolean} reversed - Positive or negative.
 * @return {date}
 */
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


// EXPORTS
// =============================================================================

export {
	start,
	stop,
	now,
	minutesFromNow,
};
