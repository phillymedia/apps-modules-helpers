"use strict";

var _lodash = require("lodash");

/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
var conf = require("../config");
// third-party libraries

// sibling modules
var striptags = require("striptags");
var Entities = require("html-entities").AllHtmlEntities;
var htmlEntities = new Entities();

// CONFIG -------------------------------
var _debug = conf.debug; // eslint-disable-line no-unused-vars


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

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

/**
* Stringify with JSON safely.
*
* @method safeStringify
* @param   {String} input						The object to stringify.
* @return  {Object} input/{Object} error		Parsed string, or error.
**/
function safeStringify(input) {
	return (0, _lodash.attempt)(JSON.stringify.bind(null, input));
}

/**
* Parse with JSON safely.
*
* @method safeParse
* @param   {Object} input						The string to parse.
* @return  {String} input/{Object} error		Parsed object, or error.
**/
function safeParse(input) {
	if (!(0, _lodash.isString)(input)) {
		return input;
	}
	return (0, _lodash.attempt)(JSON.parse.bind(null, input));
}

/**
* Strip html from text.
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
	if (!(0, _lodash.isString)(input)) {
		return input;
	}
	return (0, _lodash.trimEnd)(input, "/");
}

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	safeStringify: safeStringify,
	safeParse: safeParse,
	htmlToText: htmlToText,
	stripTrailingSlash: stripTrailingSlash
};