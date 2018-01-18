"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require("./create");

Object.defineProperty(exports, "getInputCreate", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_create).default;
  }
});

var _update = require("./update");

Object.defineProperty(exports, "getInputUpdate", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_update).default;
  }
});

var _read = require("./read");

Object.defineProperty(exports, "getInputRead", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_read).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }