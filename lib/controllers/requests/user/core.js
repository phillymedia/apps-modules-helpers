/**
 * PHILLLY HELPERS
 * requests/user/core
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
 * Get the inputs from the user route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab from request
	const user = req.input.user || req.user;
	// error if missing
	if (!user || !isString(user)) {
		return next(errors.makeError("NoUser", "Missing or invalid user.", "Helpers getInputUser", 400));
	}
	// set to request
	req.user = user;
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
