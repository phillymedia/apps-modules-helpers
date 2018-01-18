// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * A wrapper for console.info.
 *
 * @method info
 * @param {array} args
 */
function info(...args) {
	console.log(...Array.prototype.slice.call(args));
}


// EXPORTS
// =============================================================================
export default info;
