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
 * @param {object} input - The object to stringify.
 * @return {string}
 */
function safeStringify(input) {
	return attempt(JSON.stringify.bind(null, input));
}

/**
 * Parse with JSON safely.
 *
 * @method safeParse
 * @param {string} input - The string to parse.
 * @return {object}
 */
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
 * @param {string} input - The string to strip.
 * @return {string}
 */
function htmlToText(input) {
	return striptags(htmlEntities.decode(input), [], " ").replace(/\s{2,}/g, " ");
}

/**
 * Delete trailing slash from the end of a string.
 *
 * @method stripTrailingSlash
 * @param {string} input - The string to strip.
 * @return {string}
 */
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
