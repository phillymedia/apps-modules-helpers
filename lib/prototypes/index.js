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
require("APP/prototypes/string");
// require(path + "array");
const number = require("APP/prototypes/number");
// const object = require("APP/prototypes/object");

// THIRD PARTY LIBRARIES -------------------------------
// lodash
import { extend } from "lodash";


/*
* EXPORT THE OBJECTS
* module.exports = _.extend(exports, object);
*/

exports = extend(exports, number);
// exports = extend(exports, object);
