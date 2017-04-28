/**
 * PHILLLY HELPERS
 * requests/user/core
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const root = "../../..";
// config
const conf = require(`${root}/config`);
// third-party
const _ = require("lodash");
// sibling modules
const errors = require(`${root}/controllers/errors`);
// const transforms = require(`${root}/controllers/transforms`);

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
	if (!user || !_.isString(user)) {
		return next(errors.makeError("NoUser", "Missing or invalid user.", "Helpers getInputUser", 400));
	}
	// set to request
	req.user = user;
	// next!
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
