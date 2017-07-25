// DEPENDENCIES
// =============================================================================
import { forEach } from "lodash";
import sns from "./sns";
import clicka from "./clicka";

// create Main
const Main = {};

// SNS SETTINGS
// =============================================================================
// add sns settings
forEach(sns, (setting, key) => {
	Main[key] = setting;
});

// CLICKA SETTINGS
// =============================================================================
// add clicka settings
forEach(clicka, (setting, key) => {
	Main[key] = setting;
});

// EXPORT
// =============================================================================
module.exports = Main;
