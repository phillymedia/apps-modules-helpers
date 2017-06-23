// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { attempt, isString, trimEnd } from "lodash";
import striptags from "striptags";
import { AllHtmlEntities } from "html-entities";
const htmlEntities = new AllHtmlEntities();


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
function safeStringify(input) {
	return attempt(JSON.stringify.bind(null, input));
}

/**
* Parse with JSON safely.
*
* @method safeParse
* @param   {Object} input						The string to parse.
* @return  {String} input/{Object} error		Parsed object, or error.
**/
function safeParse(input) {
	if (!isString(input)) {
		return input;
	}
	return attempt(JSON.parse.bind(null, input));
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
	if (!isString(input)) {
		return input;
	}
	return trimEnd(input, "/");
}


// EXPORTS
// =============================================================================

export {
	safeStringify,
	safeParse,
	htmlToText,
	stripTrailingSlash,
};
