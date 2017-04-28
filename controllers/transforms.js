/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
// config
const conf = require("@/config");
// third-party libraries
const _ = require("lodash");
const mongoose = require("mongoose"); // eslint-disable-line no-unused-vars
const striptags = require("striptags");
const Entities = require("html-entities").AllHtmlEntities;
const htmlEntities = new Entities();

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

// DEVICE -------------------------------
/*
var _AndroidClient = global.nconf.get("ClientUserAgentHint:Android");
var _iOSClient = global.nconf.get("ClientUserAgentHint:iOS");
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

/**
* Stringify with JSON safely.
*
* @method safeStringify
* @param   {String} input						The object to stringify.
* @return  {Object} input/{Object} error		Parsed string, or error.
**/
function safeStringify(input) {
	return _.attempt(JSON.stringify.bind(null, input));
}

/**
* Parse with JSON safely.
*
* @method safeParse
* @param   {Object} input						The string to parse.
* @return  {String} input/{Object} error		Parsed object, or error.
**/
function safeParse(input) {
	if (_.isObject(input)) {
		return input;
	}
	return _.attempt(JSON.parse.bind(null, input));
}

/**
* Stop the timer.
*
* @method htmlToText
* @param   {String} input						The string to strip.
* @return  {String} input						Formatted string.
**/
function htmlToText(input) {
	return striptags(htmlEntities.decode(input), [], " ").replace(/\s{2,}/g, " ");
}

/**
* Delete trailing slash from the end of a string.
*
* @method stripTrailingSlash
* @param   {String} input						The string to strip.
* @return  {String} input						The stripped string.
**/
function stripTrailingSlash(input) {
	if (!_.isString(input)) {
		return input;
	}
	return _.trimEnd(input, "/");
}


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// TEXT TRANSFORMS
// =============================================================================
// stringify
Main.prototype.safeStringify = safeStringify;
// parse
Main.prototype.safeParse = safeParse;
// strip html
Main.prototype.htmlToText = htmlToText;
// delete trailing slash from the end of a string
Main.prototype.stripTrailingSlash = stripTrailingSlash;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
