"use strict";

var _lodash = require("lodash");

var sns = require("./sns");
// const store = require("./store");

// create Main
/**
 * HELPERS APP
 * configure settings
 * Sets up the Node server with Express.
**/

// dependencies
// import _ from "lodash";
// import app from "./app";
var Main = {};

// SNS SETTINGS
// ==============
// add sns settings
(0, _lodash.forEach)(sns, function (setting, key) {
  Main[key] = setting;
});

// EXPORT
// =============================================================================
module.exports = Main;