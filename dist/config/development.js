"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = require("./global");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TEST
// =============================================================================
// change settings for development
// SETTINGS -------------------------------
_global2.default.env = "development";

// EXPORT
// =============================================================================
// import the global settings
exports.default = _global2.default;