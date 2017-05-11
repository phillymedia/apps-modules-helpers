/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// PROTOTYPES
// =============================================================================
// extend the prototypes appropriately
require("./prototypes");

// MOST DEPENDENCIES
// =============================================================================
const errors = require("COMP/errors");
const requests = require("COMP/requests");
const responses = require("COMP/responses");
const timestamps = require("COMP/timestamps");
const transforms = require("COMP/transforms");


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

// ERRORS
// =============================================================================
// construct an Error
Main.prototype.makeError = errors.makeError;
// ensure properly formatted error
Main.prototype.formatError = errors.formatError;
// mongoose error handling
Main.prototype.mongooseErrorHandler = errors.mongooseErrorHandler;


// REQUESTS
// =============================================================================
// needed for routes that receive from AWS
Main.prototype.getRawBody = requests.getRawBody;
// needed for most routes
Main.prototype.standardizeInput = requests.standardizeInput;
/*
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
*/
// feed input detail
Main.prototype.getInputFeedDetail = requests.getInputFeedDetail;
// feed input search
Main.prototype.getInputFeedSearch = requests.getInputFeedSearch;
/*
// system input
Main.prototype.getInputSystem = requests.getInputSystem;
// admin input
Main.prototype.getInputAdmin = requests.getInputAdmin;
// admin input delete
Main.prototype.getInputAdminDelete = requests.getInputAdminDelete;
// user input
Main.prototype.getInputUser = requests.getInputUser;
// user input subscribe
Main.prototype.getInputUserSubscribe = requests.getInputUserSubscribe;
// user input unsubscribe
Main.prototype.getInputUserUnsubscribe = requests.getInputUserUnsubscribe;
// user input endpoint
Main.prototype.getInputUserEndpoint = requests.getInputUserEndpoint;
*/


// RESPONSES
// =============================================================================
// the user is not authorized!
Main.prototype.sendUnauthorized = responses.sendUnauthorized;
// the operation failed in some way, send a responses
Main.prototype.sendFailure = responses.sendFailure;
// the operation succeeded, prepare a successful responses
Main.prototype.prepSuccess = responses.prepSuccess;
// the operation succeeded, send a responses
Main.prototype.sendSuccess = responses.sendSuccess;
// disallow search engine crawlers
Main.prototype.handleRobots = responses.handleRobots;
// middleware for sending success messages
Main.prototype.handleSuccess = responses.handleSuccess;
// middleware for sending failure messages
Main.prototype.handleFailure = responses.handleFailure;


// TIMESTAMPS
// =============================================================================
// time a given function
Main.prototype.timerStart = timestamps.start;
Main.prototype.timerStop = timestamps.stop;
// manipulate a date
Main.prototype.now = timestamps.now;
Main.prototype.minutesFromNow = timestamps.minutesFromNow;


// TRANSFORMS
// =============================================================================
// stringify
Main.prototype.safeStringify = transforms.safeStringify;
// parse
Main.prototype.safeParse = transforms.safeParse;
// strip html
Main.prototype.htmlToText = transforms.htmlToText;
// delete trailing slash from the end of a string
Main.prototype.stripTrailingSlash = transforms.stripTrailingSlash;

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
