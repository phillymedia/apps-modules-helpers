/**
 * HELPERS APP
 * configure settings
 * Sets up the Node server with Express.
**/

// dependencies
// import _ from "lodash";
// import app from "./app";
import { forEach } from "lodash";
const sns = require("./sns");
// const store = require("./store");

// create Main
const Main = {};

// SNS SETTINGS
// ==============
// add sns settings
forEach(sns, (setting, key) => {
	Main[key] = setting;
});


// EXPORT
// =============================================================================
module.exports = Main;
