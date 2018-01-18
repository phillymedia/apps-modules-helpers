"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _development = require("./development");

var _development2 = _interopRequireDefault(_development);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TEST
// =============================================================================
// change settings for development
// SETTINGS -------------------------------
_development2.default.env = "test";

// EXPORT
// =============================================================================
// import the DEV version of global settings
exports.default = _development2.default;