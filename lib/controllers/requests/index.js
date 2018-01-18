// EXPORTS
// =============================================================================

// core
export {
	getRawBody,
	standardizeInput,
} from "./core";

// clickability
export {
	getInputCreate as getInputClickabilityCreate,
	getInputRead as getInputClickabilityRead,
	getInputUpdate as getInputClickabilityUpdate,
} from "./clickability";

// feed
export {
	getInputDetail as getInputFeedDetail,
	getInputSearch as getInputFeedSearch,
} from "./feed";

// notifications
export {
	getInput as getInputDeviceHints,
	getInputPublish as getInputDevicePublish,
	getInputEndpoint as getInputDeviceEndpoint,
	getInputSubscribe as getInputDeviceSubscribe,
} from "./notifications";


// EXPORTS
// =============================================================================

/*
export {
	// core
	// feed
	// notifications
	getAppHints: notifications.getAppHints,
	getTermHints: notifications.getTermHints,
	getInputDeviceHints: notifications.getInput,
	getInputDeviceEndpoint: notifications.getInputEndpoint,
	getInputDeviceSend: notifications.getInputPublish,
	getInputDeviceData: notifications.getInputSubscribe,


// get device hints from user agent
Main.prototype.getDeviceHints = requests.getDeviceHints;
// get term hints
Main.prototype.getTermHints = requests.getTermHints;
// device input hints
Main.prototype.getInputDeviceHints = requests.getInputDeviceHints;
// device input data
Main.prototype.getInputDeviceData = requests.getInputDeviceData;
// device input send
Main.prototype.getInputDeviceSend = requests.getInputDeviceSend;
// device input endpoint
Main.prototype.getInputDeviceEndpoint = requests.getInputDeviceEndpoint;


	// user
	getInputUser: user.getInput,
	getInputUserSubscribe: user.getInputSubscribe,
	getInputUserUnsubscribe: user.getInputUnsubscribe,
	getInputUserEndpoint: user.getInputEndpoint,
	// system
	getInputSystem: system.getInput,
	getInputAdmin: system.getInputAdmin,
	getInputAdminDelete: system.getInputAdminDelete,
};
*/
