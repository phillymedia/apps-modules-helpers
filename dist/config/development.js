"use strict";

/**
 * HELPERS APP
 * configure settings
 * Sets up the Node server with Express.
**/

// import the global settings
var Main = require("./global");

// TEST
// =============================================================================
// change settings for development
// SETTINGS -------------------------------
Main.env = "development";

// EXPORT
// =============================================================================
module.exports = Main;