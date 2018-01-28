// DEPENDENCIES
// =============================================================================
import { forEach } from "lodash";
import clicka from "./clicka";
import sns from "./sns";

// create Main
const Main = {};


// APP SETTINGS
// =============================================================================
forEach([clicka, sns], settings => forEach(settings, (setting, key) => (Main[key] = setting)));


// EXPORT
// =============================================================================
export default Main;
