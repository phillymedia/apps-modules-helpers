/**
 * PHILLLY HELPERS
 * requests/feed/search
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
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
 * Get the inputs from the feed/search route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab input from the request input
	const search = req.input.search;
	// if no id, abort!
	if (!search || !isString(search)) {
		return next(errors.makeError("NoSearchTerm", "No key words specified.", 400));
	}
	// save the id to req.id
	req.search = search;
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
