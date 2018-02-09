"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _logging = require("../../logging");

var _logging2 = _interopRequireDefault(_logging);

var _config = require("../../../config");

var _errors = require("../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PROPERTIES
// =============================================================================
// PRIVATE -------------------------------

// config
// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
var _hints = _config.sns.hints;
// sibling modules

// APP -------------------------------

var _sns$cats = _config.sns.cats,
    _sportsNow = _sns$cats.sportsNow,
    _phillyCom = _sns$cats.phillyCom;

// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Turn the hints from our data into the expected information for AWS.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */

function getHints(userAgent, subHints, unsubHints) {
  var isSportsNow = false;
  var isPhillyCom = false; // eslint-disable-line no-unused-vars

  // ensure hint is an array
  if (subHints && (0, _lodash.isString)(subHints)) {
    subHints = [subHints];
    unsubHints = false;
  }
  // or false, if an empty array (which is truthy)
  else if ((0, _lodash.isArray)(subHints) && (0, _lodash.isEmpty)(subHints)) {
      subHints = false;
    }

  // to return the data
  var appData = {
    appHint: "",
    subHints: [],
    unsubHints: []
  };

  // find currHint
  var currHint = (0, _lodash.find)(_hints, function (hint) {
    // skip hints that don't match
    if (userAgent.indexOf(hint.userAgent) === -1) {
      return false;
    }
    // add the hint that does
    // logging
    _logging2.default.debug("App hint " + hint.appHint + " from user agent " + userAgent);
    // add app hint
    appData.appHint = hint.appHint;
    // add sub hints, if there were none earlier
    subHints = subHints || hint.termHint;
    // logging
    _logging2.default.debug("Sub hints: " + subHints);
    // mark for sports now
    if (userAgent.indexOf(_sportsNow) === 0) {
      _logging2.default.debug("Determined: Sports Now!");
      isSportsNow = true;
    }
    // or philly.com
    else if (userAgent.indexOf(_phillyCom) === 0) {
        _logging2.default.debug("Determined: Philly.com");
        isPhillyCom = true;
      }
    // done!
    return true;
  });

  // no hint found? error!
  if (!appData.appHint) {
    return false;
  }

  // empty?
  if (!(0, _lodash.isEmpty)(subHints)) {
    // array
    if ((0, _lodash.isArray)(subHints)) {
      // add hints
      appData.subHints = (0, _lodash.map)(subHints, function (hint) {
        return hint + (isSportsNow ? currHint.osPostfix : "");
      });
    }
    // just a string, so add it as one
    else {
        appData.subHints.push(subHints);
      }
  }
  // set to false
  else {
      appData.subHints = false;
    }

  // empty?
  if (!(0, _lodash.isEmpty)(unsubHints)) {
    // array
    if ((0, _lodash.isArray)(unsubHints)) {
      // add hints
      appData.unsubHints = (0, _lodash.map)(unsubHints, function (hint) {
        return hint + (isSportsNow ? currHint.osPostfix : "");
      });
    }
    // just a string, so add it as one
    else {
        appData.unsubHints.push(unsubHints);
      }
  }
  // set to false
  else {
      appData.unsubHints = false;
    }
  // return fully constructed appData
  return appData;
}

// PUBLIC -------------------------------

/**
 * Get input from the notifications route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
  // run a helpers function to cleanly and simply turn the useragent into a
  // req.body parameter, which can then be used by notifications
  var userAgent = req.headers["user-agent"];

  var subHint = void 0;
  var unsubHint = void 0;
  // use singular topic if it exists
  if (req.input.topic) {
    if ((0, _lodash.isString)(req.input.topic)) {
      subHint = req.input.topic;
    }
    // use object if it exists
    else if ((0, _lodash.isObject)(req.input.topic)) {
        // now arrays
        subHint = [];
        unsubHint = [];
        // add true values to subscribe array, false values to unsubscribe array
        (0, _lodash.forEach)(req.input.topic, function (value, key) {
          // subscribe
          if (req.input.topic[key]) {
            return subHint.push(key);
          }
          // unsubscribe
          return unsubHint.push(key);
        });
      }
  }
  // grab data
  var hints = getHints(userAgent, subHint, unsubHint);
  // check to make sure data is set
  if (!hints) {
    return next((0, _errors.makeError)("InvalidRequest", "Unauthorized access."));
  }
  // if all is good, set input to request
  req.appHint = hints.appHint;
  req.subHints = hints.subHints;
  req.unsubHints = hints.unsubHints;
  // next!
  return next();
}

// EXPORTS
// =============================================================================

exports.default = getInput;