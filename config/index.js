/**
 * HELPERS APP
 * configure settings
*/

// grab environment variables
const env = process.env.NODE_ENV || process.env.npm_config_environment || process.env.npm_package_config_environment || "production";
// nab from parent app or command line
// (we use a separate debugmode process so as not to turn on the debug mode in OTHER modules)
const debug = process.env.DEBUGMODE || (process.env.npm_config_debugmode === "true");
// import config based on environment
// const Main = require(`./${env}`);
const Main = {
	env,
	debug,
};
// print information about environment.
if (Main.debug) {
	console.log("Running app in", Main.env, "mode. Debug is on.");
}
// export completed config file
module.exports = Main;
