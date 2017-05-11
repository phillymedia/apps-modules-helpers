"use strict";

/**
 * HELPERS APP
 * configure settings
 * Sets up the Node server with Express.
**/

// import the DEV version of global settings
var Main = require("./development");

// TEST
// =============================================================================
// change settings for development
// SETTINGS -------------------------------
Main.env = "test";

// EXPORT
// =============================================================================
module.exports = Main;