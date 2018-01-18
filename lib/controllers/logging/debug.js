// DEPENDENCIES
// =============================================================================
import { debug as _debug } from "APP/config";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * A logger that only prints out in debug mode.
 *
 * @method debug
 * @param {array} args
 */
function debug(...args) {
	if (_debug) {
		console.log(...Array.prototype.slice.call(args));
	}
}


// EXPORTS
// =============================================================================
export default debug;
