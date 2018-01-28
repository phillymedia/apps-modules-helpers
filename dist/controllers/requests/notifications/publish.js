"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _config = require("../../../config");

var _errors = require("../../errors");

// CONFIG -------------------------------

// APP -------------------------------
var _hints = _config.sns.hints;

// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Get the inputs from the notifications/publish route.
 *
 * @param {string} targetHint
 * @returns {array}
 */

// sibling modules
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
function getHints(targetHint) {
  // define variables
  var termHints = void 0;
  // get hints array
  var hints = (0, _lodash.filter)(_hints, function (currHint) {
    return currHint.targetHint === targetHint;
  });
  // return a flat map of terms
  return (0, _lodash.flatten)((0, _lodash.map)(hints, function (currHint) {
    termHints = currHint.termHint;
    // add singular hint
    if ((0, _lodash.isString)(termHints)) {
      return currHint.termHint;
    }
    // handle arrays

    return (0, _lodash.map)(termHints, function (hint) {
      return hint + (targetHint === "sportscombo" ? currHint.osPostfix : "");
    });
  }));
}

// PUBLIC -------------------------------

/**
 * Get the inputs from the feed/search route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
  // grab input from the request input
  var input = {
    id: req.input.id,
    deviceSubject: req.input.subject,
    deviceMessage: req.input.message,
    termHints: req.input.target
  };
  // loop through, adding to the request
  (0, _lodash.forOwn)(input, function (value, key) {
    // eslint-disable-line consistent-return
    // subject is optional, everything else is not
    if (!value && key !== "deviceSubject") {
      // make an error
      next((0, _errors.makeError)("MissingInput", "Missing " + key + " in request input.", "Helpers getInputDeviceSend", 400));
      // break loop
      return false;
    }
    // special handling for term hint
    if (key === "termHints") {
      // save original value to the request
      req.originalTarget = value;
      // transform it
      value = getHints(value);
      if ((0, _lodash.isString)(value)) {
        value = [value];
      }
    }
    // add to the request
    req[key] = value;
  });
  // next!
  return next();
}

// EXPORTS
// =============================================================================

exports.default = getInput;