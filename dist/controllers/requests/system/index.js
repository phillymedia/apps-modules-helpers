"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require("./core");

Object.defineProperty(exports, "getInput", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_core).default;
  }
});

var _admin = require("./admin");

Object.defineProperty(exports, "getInputAdmin", {
  enumerable: true,
  get: function get() {
    return _admin.getInput;
  }
});
Object.defineProperty(exports, "getInputAdminDelete", {
  enumerable: true,
  get: function get() {
    return _admin.getInputDelete;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }