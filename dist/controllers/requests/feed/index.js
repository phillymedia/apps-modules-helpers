"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _detail = require("./detail");

Object.defineProperty(exports, "getInputDetail", {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_detail).default;
	}
});

var _search = require("./search");

Object.defineProperty(exports, "getInputSearch", {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_search).default;
	}
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }