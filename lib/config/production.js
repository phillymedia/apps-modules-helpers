/**
 * HELPERS APP
 * configure settings
 * Sets up the Node server with Express.
**/

// import the global settings
const Main = require("./global");

// TEST
// =============================================================================
// change settings for production
// SETTINGS -------------------------------
Main.env = "production";


// EXPORT
// =============================================================================
module.exports = Main;
