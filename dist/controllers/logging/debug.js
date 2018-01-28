"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../../config");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // DEPENDENCIES
// =============================================================================


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * A logger that only prints out in debug mode.
 *
 * @param {array} args
 */
function debug() {
  if (_config.debug) {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, _toConsumableArray(Array.prototype.slice.call(args)));
  }
}

// EXPORTS
// =============================================================================
exports.default = debug;