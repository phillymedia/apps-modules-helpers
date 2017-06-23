"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stripTrailingSlash = exports.htmlToText = exports.safeParse = exports.safeStringify = undefined;

var _lodash = require("lodash");

var _striptags = require("striptags");

var _striptags2 = _interopRequireDefault(_striptags);

var _htmlEntities = require("html-entities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var htmlEntities = new _htmlEntities.AllHtmlEntities();

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
* Stringify with JSON safely.
*
* @method safeStringify
* @param   {String} input						The object to stringify.
* @return  {Object} input/{Object} error		Parsed string, or error.
**/
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
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
	return (0, _striptags2.default)(htmlEntities.decode(input), [], " ").replace(/\s{2,}/g, " ");
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

// EXPORTS
// =============================================================================

exports.safeStringify = safeStringify;
exports.safeParse = safeParse;
exports.htmlToText = htmlToText;
exports.stripTrailingSlash = stripTrailingSlash;