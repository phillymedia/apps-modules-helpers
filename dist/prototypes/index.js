"use strict";

var _lodash = require("lodash");

/**
* PHILLY NOTIFICATIONS APP
* the core prototypes module
**/

// SETUP
// =============================================================================
// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// app doesn't exist yet, so
// config
require("./string");
// require(path + "array");
var number = require("./number");
// const object = require("APP/prototypes/object");

// THIRD PARTY LIBRARIES -------------------------------
// lodash


/*
* EXPORT THE OBJECTS
* module.exports = _.extend(exports, object);
*/

exports = (0, _lodash.extend)(exports, number);
// exports = extend(exports, object);