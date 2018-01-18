"use strict";

var _lodash = require("lodash");

// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// app doesn't exist yet, so
// config
require("./string");
// require(path + "array");
var number = require("./number");

// THIRD PARTY LIBRARIES -------------------------------
// lodash


/*
* EXPORT THE OBJECTS
* module.exports = _.extend(exports, object);
*/

exports = (0, _lodash.extend)(exports, number);
// exports = extend(exports, object);