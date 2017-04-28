/**
 * PHILLLY HELPERS
 * requests/feed/search
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const root = "../../..";
// config
const conf = require(`${root}/config`);
// third-party
const _ = require("lodash");
// sibling modules
const errors = require(`${root}/controllers/errors`);
const transforms = require(`${root}/controllers/transforms`);

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars


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
* PRIVATE PROPERTIES
* var _privateBar;
*/

/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

/**
 * Get the inputs from the system route.
 *
 * @method getInput
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
function getInput(req, res, next) {
	// grab header x-amz-sns-message-type
	const reqCat = req.headers["x-amz-sns-message-type"];
	let message;
	// possible types: SubscriptionConfirmation, Notification, UnsubscribeConfirmation
	// (used only when the subscription is deleted from the term).
	// give err an initial value
	let err = null;
	// check reqCat
	switch (reqCat) {
	case "SubscriptionConfirmation":
		req.cat = "subscribe";
		console.log("Subscribing?");
		// grab request items from req.input
		req.token = req.input.Token;
		req.term = req.input.TopicArn;
		// next!
		break;
	case "UnsubscribeConfirmation":
		req.cat = "unsubscribe";
		console.log("Unsubscribing?");
		// don"t really need to do anything
		break;
	case "Notification":
		req.cat = "notification";
		console.log("Notification!");
		message = transforms.safeParse(req.input.Message);
		// error?
		if (_.isError(message)) {
			err = errors.makeError("InvalidRequest", `Invalid request input:${transforms.safeStringify(req.input)}`, "Helpers getInputSystem > transforms.safeParse", 400);
		}
		// false just means the input was empty
		if (!message) {
			err = errors.makeError("InvalidRequest", "Input was empty", "Helpers getInputSystem", 400);
		}
		// else, set request items
		req.source = message.Resource;
		req.endpoint = message.EndpointArn;
		req.event = message.EventType;
		req.failure = message.FailureType;
		// next!
		break;
	default:
		err = errors.makeError("InvalidRequest", "Invalid request.", "Helpers getInputSystem", 500);
	}
	return next(err);
}

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// ADD INPUT
// =============================================================================
// for system
Main.prototype.getInput = getInput;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
