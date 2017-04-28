/**
 * PHILLLY HELPERS
 * requests/feed/search
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("@/config");
// third-party
const _ = require("lodash");
// sibling modules
const errors = require("@/controllers/errors");
const transforms = require("@/controllers/transforms");

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


/*
* CONSTRUCTOR METHOD
* function Foo(){ // set some variables up }
*/
function Main() {
	/*
	* PUBLIC PROPERTIES
	* this.publicBar = foo;
	*/
}


/*
* PRIVATE PROPERTIES
* var _privateBar;
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
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
	if (!search || !_.isString(search)) {
		return next(errors.makeError("NoId", "No key words specified.", 400));
	}
	// save the id to req.id
	req.search = search;
	// continue processing
	return next();
}

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// ADD INPUT
// =============================================================================
// for feed/search
Main.prototype.getInput = getInput;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
