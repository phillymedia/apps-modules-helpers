/**
 * PHILLLY HELPERS
 * requests/user/endpoint
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
 * Get the inputs from the user/endpoint route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab from request
	const emailOld = req.input.email_old;
	const emailNew = req.input.email_new;
	// error if missing
	if (!emailOld || !isString(emailOld)) {
		return next(errors.makeError("NoEmail", "Missing or invalid emailOld.", "Helpers getInputUserEndpoint", 400));
	}
	if (!emailNew || !isString(emailNew)) {
		return next(errors.makeError("NoEmail", "Missing or invalid emailNew.", "Helpers getInputUserEndpoint", 400));
	}
	// set to request
	req.email_old = emailOld;
	req.email_new = emailNew;
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
