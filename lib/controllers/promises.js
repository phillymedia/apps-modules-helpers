
// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Wait until a given number of seconds have passed.
 *
 * @param {promise} promise - The promises to race. (Pass Promise.all to do multiple promises.)
 * @param {number} delay - The time to wait, in seconds.
 * @param {any} failValue - The value to return on failure.
 */
function until(promise, delay, failValue) {
  // the timeout
  const timeout = new Promise((resolve) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve(failValue);
    }, delay * 1000);
  });

  // returns a race between our desired promise and the timeout
  return Promise.race([
    promise,
    timeout,
  ]);
}


// EXPORTS
// =============================================================================

export {
  until,
};
