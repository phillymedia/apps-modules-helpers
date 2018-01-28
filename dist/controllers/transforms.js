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
 * @param {object} input - The object to stringify.
 * @return {string}
 */
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function safeStringify(input) {
  return (0, _lodash.attempt)(JSON.stringify.bind(null, input));
}

/**
 * Parse with JSON safely.
 *
 * @param {string} input - The string to parse.
 * @return {object}
 */
function safeParse(input) {
  if (!(0, _lodash.isString)(input)) {
    return input;
  }
  return (0, _lodash.attempt)(JSON.parse.bind(null, input));
}

/**
 * Strip html from text.
 *
 * @param {string} input - The string to strip.
 * @return {string}
 */
function htmlToText(input) {
  return (0, _striptags2.default)(htmlEntities.decode(input), [], " ").replace(/\s{2,}/g, " ");
}

/**
 * Delete trailing slash from the end of a string.
 *
 * @param {string} input - The string to strip.
 * @return {string}
 */
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