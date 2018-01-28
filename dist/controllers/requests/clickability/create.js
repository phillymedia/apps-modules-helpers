"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _errors = require("../../errors");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the feed/search route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function getInput(req, res, next) {
  // grab input from the request inputu
  var subscriber = req.input.subscriber;
  // if no parameter, abort!

  if (!subscriber || (0, _lodash.isObject)(subscriber) && (0, _lodash.isEmpty)(subscriber)) {
    return next((0, _errors.makeError)("MissingParameter", "No subscriber specified.", "helpers -> getInput", 400));
  }
  // email always required
  if (!subscriber.email) {
    return next((0, _errors.makeError)("MissingParameter", "Email required.", "helpers -> getInput", 400));
  }
  // password always required
  if (!subscriber.password) {
    return next((0, _errors.makeError)("MissingParameter", "Password required.", "helpers -> getInput", 400));
  }
  // save the parameter to request
  req.subscriber = subscriber;
  // continue processing
  return next();
}

// EXPORTS
// =============================================================================

// APP -------------------------------
// sibling modules
exports.default = getInput;