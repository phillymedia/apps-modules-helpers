/**
 * HELPERS APP
 * configure settings
*/

// grab environment variables
// grab environment
const env = process.env.NODE_ENV
	// npm
	|| process.env.npm_config_environment
	|| process.env.npm_package_config_environment
	// default
	|| "production";
// grab debug mode
const debug = process.env.DEBUG
	// (we use a separate debugmode process so as not to turn on the debug mode in OTHER modules)
	|| process.env.DEBUGMODE
	// npm
	|| (process.env.npm_config_debugmode === "true");

console.log("Environment", process.env.NODE_ENV, process.env.npm_config_environment, process.env.npm_package_config_environment);
console.log("Debug - env", process.env.DEBUG, "Debug - env-mode", process.env.DEBUGMODE, "Debug - package", process.env.npm_config_debugmode, "Debug - final value", debug);
// import config based on environment
// const Main = require(`./${env}`);
const Main = {
	env,
	debug,
};
// print information about environment.
if (Main.debug) {
	console.log("Running helpers app in", Main.env, "mode. Debug is on.");
}
// export completed config file
module.exports = Main;
