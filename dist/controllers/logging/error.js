"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * A wrapper for console.log.
 *
 * @param {array} args
 */
function error() {
  var _console;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).error.apply(_console, _toConsumableArray(Array.prototype.slice.call(args)));
}

// EXPORTS
// =============================================================================
exports.default = error;