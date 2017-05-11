/**
 * PHILLLY HELPERS
 * requests/feed/detail
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("APP/config");
// third-party libraries
import { isArray } from "lodash";
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
 * Get the inputs from the feed/search route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab input from the request input
	const id = req.input.id;
	// if no id, abort!
	if (!id || !isArray(id)) {
		return next(errors.makeError("NoId", "No ID specified.", 400));
	}
	// save the id to req.id
	req.id = id;
	// continue processing
	return next();
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	getInput,
};
