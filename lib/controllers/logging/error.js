// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * A wrapper for console.log.
 *
 * @method log
 * @param {array} args
 */
function error(...args) {
	console.error(...Array.prototype.slice.call(args));
}


// EXPORTS
// =============================================================================
export default error;
