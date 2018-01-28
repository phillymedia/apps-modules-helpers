"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require("./debug");

var _debug2 = _interopRequireDefault(_debug);

var _error = require("./error");

var _error2 = _interopRequireDefault(_error);

var _info = require("./info");

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// EXPORTS
// =============================================================================
exports.default = {
  info: _info2.default,
  debug: _debug2.default,
  error: _error2.default
}; // DEPENDENCIES
// =============================================================================