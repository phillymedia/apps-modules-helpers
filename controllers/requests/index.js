/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const core = require("./core");
const feed = require("./feed");


/*
* CONSTRUCTOR METHOD
* function Foo(){ // set some variables up }
*/

function Main() {

	/*
	* PUBLIC PROPERTIES
	* this.publicBar = foo;
	*/
}

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// CORE
// =============================================================================
// needed for routes that receive from AWS
Main.prototype.getRawBody = core.getRawBody;
// needed for most routes
Main.prototype.standardizeInput = core.standardizeInput;

// NOTIFICATIONS
// =============================================================================
/*
// device input hints
Main.prototype.getInputDeviceHints = notifications.getInput;
// endpoint
Main.prototype.getInputDeviceEndpoint = notifications.getInputEndpoint;
// publish
Main.prototype.getInputDeviceSend = notifications.getInputPublish;
// subscribe
Main.prototype.getInputDeviceData = notifications.getInputSubscribe;
*/

// FEED
// =============================================================================
// feed input detail
Main.prototype.getInputFeedDetail = feed.getInputDetail;
// feed input search
Main.prototype.getInputFeedSearch = feed.getInputSearch;

// SYSTEM
// =============================================================================
/*
// system input
Main.prototype.getInputSystem = system.getInput;
// admin input
Main.prototype.getInputAdmin = system.getInputAdmin;
// admin input delete
Main.prototype.getInputAdminDelete = system.getInputAdminDelete;

// USER
// =============================================================================
// user input
Main.prototype.getInputUser = user.getInput;
// user input subscribe
Main.prototype.getInputUserSubscribe = user.getInputSubscribe;
// user input unsubscribe
Main.prototype.getInputUserUnsubscribe = user.getInputUnsubscribe;
// user input endpoint
Main.prototype.getInputUserEndpoint = user.getInputEndpoint;
*/

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
