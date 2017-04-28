/**
 * PHILLLY HELPERS
 * requests/feed/detail
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
 * Get the inputs from the system/admin route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
	// grab item
	let item = req.input.item;
	// if no item, abort!
	if (!item) {
		return next(errors.makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = transforms.safeParse(req.input.item);
	// error?
	if (_.isError(item)) {
		return next(errors.makeError("InvalidRequest", `Invalid request input:${transforms.safeStringify(req.input)}`, "Helpers getInputAdmin > transforms.safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next(errors.makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
	}
	// otherwise, set to request
	req.item = item;
	// next!
	return next();
}

/**
 * Get the inputs from the system/admin/delete route.
 *
 * @method getInputDelete
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInputDelete(req, res, next) {
	// grab item
	let item = req.input.item;
	// if no item, abort!
	if (!item) {
		return next(errors.makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = transforms.safeParse(req.input.item);
	// error?
	if (_.isError(item)) {
		return next(errors.makeError("InvalidRequest", `Invalid request input:${transforms.safeStringify(req.input)}`, "Helpers getInputAdmin > transforms.safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next(errors.makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
	}
	// otherwise, set to request
	req.item = item;
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
// for system/admin
Main.prototype.getInput = getInput;
// for system/admin/delete
Main.prototype.getInputDelete = getInputDelete;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
