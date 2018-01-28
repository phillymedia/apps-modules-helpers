"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _clicka = require("./clicka");

var _clicka2 = _interopRequireDefault(_clicka);

var _sns = require("./sns");

var _sns2 = _interopRequireDefault(_sns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create Main
var Main = {};

// APP SETTINGS
// =============================================================================
// DEPENDENCIES
// =============================================================================
(0, _lodash.forEach)([_clicka2.default, _sns2.default], function (settings) {
  return (0, _lodash.forEach)(settings, function (setting, key) {
    return Main[key] = setting;
  });
});

// EXPORT
// =============================================================================
exports.default = Main;