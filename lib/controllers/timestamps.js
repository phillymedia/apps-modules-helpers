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

/**
 * Adds or substracts hours from now().
 *
 * @param {number} hours - Hours from now (defaults to 0).
 * @param {boolean} reversed - Positive or negative.
 * @return {date}
 */
function hoursFromNow(hours = 0, reversed = false) {
  // date
  const currentTime = now();
  // set minutes
  hours = currentTime.getHours() + Number((reversed ? "-" : "") + hours);
  // adjust date
  currentTime.setHours(hours);
  // return date
  return currentTime;
}

/**
 * Adds or substracts days from now().
 *
 * @param {number} days - Days from now (defaults to 0).
 * @param {boolean} reversed - Positive or negative.
 * @return {date}
 */
function daysFromNow(days = 0, reversed = false) {
  // date
  const date = now();
  // set days
  days = date.getDate() + Number((reversed ? "-" : "") + days);
  // adjust date
  date.setDate(days);
  // return date
  return date;
}

/**
 * Adds or substracts months (increments of 30 days) from now().
 *
 * @param {number} months - Months from now (defaults to 0).
 * @param {boolean} reversed - Positive or negative.
 * @return {date}
 */
function monthsFromNow(months = 0, reversed = false) {
  // date
  const date = now();
  // set days (in months, 1 month = 30 days)
  months = date.getDate() + Number((reversed ? "-" : "") + (months * 30));
  // adjust date
  date.setDate(months);
  // return date
  return date;
}

/**
 * Returns a today's date at the very end of the day.
 * We only want to store these for 24 hours.
 *
 * @param {date} date - Defaults to now().
 * @returns {date}
 */
function endOfDay(date = now()) {
  // set hours
  date.setHours(24, 0, 0, 0);
  // return date
  return date;
}

/**
 * Returns a week from now, at the very end of the day.
 * We only want to store these for 24 hours.
 *
 * @returns {date}
 */
function endOfWeek() {
  // date (now + 7 days)
  const date = daysFromNow(7);
  // return date at end of day
  return endOfDay(date);
}

/**
 * Returns a month (30 days) from now, at the very end of the day.
 * We only want to store these for 24 hours.
 *
 * @returns {date}
 */
function endOfMonth() {
  // date (now + 30 days)
  const date = monthsFromNow(1);
  // return date at end of day
  return endOfDay(date);
}


// EXPORTS
// =============================================================================

export {
  start,
  stop,
  now,
  minutesFromNow,
  hoursFromNow,
  daysFromNow,
  monthsFromNow,
  endOfDay,
  endOfWeek,
  endOfMonth,
};
