/**
 * PHILLLY HELPERS
 * requests/user/unsubscribe
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("APP/config");
// third-party libraries
import { isString } from "lodash";
// sibling modules
const errors = require("COMP/errors");
// const transforms = require("COMP/transforms");

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* PRIVATE PROPERTIES
* var _privateBar;
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
 * Get the inputs from the user/unsubscribe route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab from request
	let unsubscriptions = req.input.unsubscriptions || req.input["unsubscriptions[]"];
	// if a string, make into an array
	if (isString(unsubscriptions)) {
		unsubscriptions = [unsubscriptions];
	}
	// if there are no subscriptions, whoops, abort
	if (!unsubscriptions || (unsubscriptions && !unsubscriptions.length)) {
		return next(errors.makeError("NoUnsubscriptions", "Nothing to unsubscribe.", "Helpers getInputUserUnsubscribe", 400));
	}
	// set to req.unsubscriptions
	req.unsubscriptions = unsubscriptions;
	// next!
	return next();
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput,
};
