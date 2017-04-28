/**
 * PHILLLY HELPERS
 *
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const _ = require("lodash");
// config
const conf = require("@/config");
// self
const core = require("./core");
// other helpers
const errors = require("@/controllers/errors");
const transforms = require("@/controllers/transforms");
// sns, used for one route
// const sns = require("_/sns");
// third-party libraries

// CONFIG -------------------------------
const _debug = conf.debug; // eslint-disable-line no-unused-vars
// const _hints = conf.sns.hints;
/*
_apps = conf.sns.appHints;
_targets = conf.sns.targetHints;
_terms = conf.sns.termHints;


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

// AWS -------------------------------
// type gets the proper instance of SNS with the proper region
const _typeDevice = "device"; // eslint-disable-line no-unused-vars
// type gets the proper instance of SNS with the proper region
// const _typeUser = "user";
// source changes whether AWS requests can be retried or not
// const _source = "helpers";

// sports now vs. philly.com
/*
const _sportsNow = conf.sns.cats.sportsNow;
const _phillyCom = conf.sns.cats.phillyCom;
*/


/*
* PRIVATE METHODS
* function _privateBar(){ var self = this; return this.foo; }
*/

// DEVICE
// =============================================================================

/**
* Get device hints from a user agent string.
*
* @method _sendUnauthorized
* @param {Object} res 				The response.
* @return {Function} next		 	Next!
*/
/*
function _getDeviceHints(userAgent, subHints, unsubHints) {
	let isSportsNow = false;
	let isPhillyCom = false; // eslint-disable-line no-unused-vars

	// ensure hint is an array
	if (subHints && _.isString(subHints)) {
		subHints = [subHints];
		unsubHints = false;
	}
	// or false, if an empty array (which is truthy)
	else if (_.isArray(subHints) && _.isEmpty(subHints)) {
		subHints = false;
	}

	// to return the data
	const appData = {
		appHint: "",
		subHints: [],
		unsubHints: [],
	};

	// find currHint
	const currHint = _.find(_hints, (hint) => {
		// skip hints that don't match
		if (userAgent.indexOf(hint.userAgent) === -1) {
			return false;
		}
		appData.appHint = hint.appHint;
		subHints = subHints || hint.termHint;
		if (userAgent.indexOf(_sportsNow) === 0) {
			isSportsNow = true;
		}
		else if (userAgent.indexOf(_phillyCom) === 0) {
			isPhillyCom = true;
		}
		return true;
	});

	// no hint found? error!
	if (!appData.appHint) {
		return false;
	}

	// empty?
	if (!_.isEmpty(subHints)) {
		// array
		if (_.isArray(subHints)) {
			// add hints
			appData.subHints = _.map(subHints, hint => hint + (isSportsNow ? currHint.osPostfix : ""));
		}
		// just a string, so add it as one
		else {
			appData.subHints.push(subHints);
		}
	}
	// set to false
	else {
		appData.subHints = false;
	}

	// empty?
	if (!_.isEmpty(unsubHints)) {
		// array
		if (_.isArray(unsubHints)) {
			// add hints
			appData.unsubHints = _.map(unsubHints,
				hint => hint + (isSportsNow ? currHint.osPostfix : ""));
		}
		// just a string, so add it as one
		else {
			appData.unsubHints.push(unsubHints);
		}
	}
	// set to false
	else {
		appData.unsubHints = false;
	}
	// return fully constructed appData
	return appData;
}
*/

// SYSTEM
// =============================================================================
// on system routes
function _getInputSystem(req, res, next) {
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

// DEVICE FUNCTIONS
// =============================================================================
// only when subscribing and checking on endpoints
/*
function _getInputDeviceHints(req, res, next) {
	// run a helpers function to cleanly and simply turn the useragent into a
	// req.body parameter, which can then be used by notifications
	const userAgent = req.headers["user-agent"];
	let subHint;
	let unsubHint;
	// use singular topic if it exists
	if (req.input.topic) {
		if (_.isString(req.input.topic)) {
			subHint = req.input.topic;
		}
		// use object if it exists
		else if (_.isObject(req.input.topic)) {
			// now arrays
			subHint = [];
			unsubHint = [];
			// add true values to subscribe array, false values to unsubscribe array
			_.forEach(req.input.topic, (value, key) => {
				if (req.input.topic[key]) {
					subHint.push(key);
				}
				else {
					unsubHint.push(key);
				}
			});
		}
	}
	// grab data
	const hints = _getDeviceHints(userAgent, subHint, unsubHint);
	// check to make sure data is set
	if (!hints) {
		return next(errors.makeError("InvalidRequest", "Unauthorized access."));
	}
	// if all is good, set input to request
	req.appHint = hints.appHint;
	req.subHints = hints.subHints;
	req.unsubHints = hints.unsubHints;
	// next!
	return next();
}
// only when subscribing
function _getInputDeviceData(req, res, next) {
	// grab input from the request input
	const deviceId = req.input.deviceToken;
	const userData = req.input.userData;
	// require device token
	if (!deviceId || !_.isString(deviceId)) {
		return next(errors.makeError("NoToken",
			"Missing or invalid device token.", "Helpers getInputDeviceData", 400));
	}
	// userdata is optional
	if (userData && !_.isString(userData)) {
		return next(errors.makeError("InvalidUserdata",
			"Invalid user data.", "Helpers getInputDeviceData", 400));
	}
	// if all is good, set input to request
	req.deviceId = deviceId;
	req.userData = userData;
	// next!
	return next();
}
// only when pushing notifications
function _getInputDeviceSend(req, res, next) {
	// grab input from the request input
	const input = {
		id: req.input.id,
		deviceSubject: req.input.subject,
		deviceMessage: req.input.message,
		termHints: req.input.target,
	};
	// loop through, adding to the request
	_.forOwn(input, (value, key) => {
		// subject is optional, everything else is not
		if (!value && key !== "deviceSubject") {
			return next(errors.makeError("MissingInput",
				`Missing ${key} in request input.`, "Helpers getInputDeviceSend", 400));
		}
		// special handling for term hint
		if (key === "termHints") {
			// save original value to the request
			req.originalTarget = value;
			// transform it
			value = _getTermHints(value);
			if (_.isString(value)) {
				value = [value];
			}
		}
		// add to the request
		req[key] = value;
	});
	// next!
	return next();
}
// only when checking on endpoints
function _getInputDeviceEndpoint(req, res, next) {
	// grab input from the request body
	const endpointHint = {};
	endpointHint.username = req.input.deviceUsername || "";
	endpointHint.token = req.input.deviceToken || "";
	// make sure one or the other actually has content
	if (!endpointHint.username && !endpointHint.token) {
		return next(errors.makeError("NoUsernameOrToken",
			"Missing both username and token.", "Helpers getInputDeviceEndpoint", 400));
	}
	// optional device switch setting
	const deviceSwitch = req.input.deviceSwitch ? "true" : "false";
	// if all is good, set input to request
	req.endpointHint = endpointHint;
	req.deviceSwitch = deviceSwitch;
	// next!
	return next();
}
*/


// OTHER FUNCTIONS
// =============================================================================

// only when pulling search
function _getInputFeedSearch(req, res, next) {
	// grab input from the request input
	const search = req.input.search;
	// if no id, abort!
	if (!search || !_.isString(search)) {
		return next(errors.makeError("NoId", "No key words specified.", 400));
	}
	// save the id to req.id
	req.search = search;
	// continue processing
	return next();
}
// only when pulling feed detail
function _getInputFeedDetail(req, res, next) {
	// grab input from the request input
	const id = req.input.id;
	// if no id, abort!
	if (!id || !_.isArray(id)) {
		return next(errors.makeError("NoId", "No ID specified.", 400));
	}
	// save the id to req.id
	req.id = id;
	// continue processing
	return next();
}
// used on all admin routes
function _getInputAdmin(req, res, next) {
	// grab item
	let item = req.input.item;
	// if no item, abort!
	if (!item) {
		return next(errors.makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
	}
	// whatever the result, make into object if string
	item = transforms.safeParse(req.input.item);
	// error?
	if (_.isError(item)) {
		return next(errors.makeError("InvalidRequest", `Invalid request input:${transforms.safeStringify(req.input)}`, "Helpers getInputAdmin > transforms.safeParse", 400));
	}
	// false just means the input was empty
	if (!item) {
		return next(errors.makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
	}
	// otherwise, set to request
	req.item = item;
	// next!
	return next();
}
// used only on the admin delete route
function _getInputAdminDelete(req, res, next) {
	// grab id
	const id = req.input.id;
	// if no id, abort!
	if (!id) {
		return next(errors.makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdminDelete", 400));
	}
	// otherwise, set to request
	req.id = id;
	// next!
	return next();
}

// used on user routes
function _getInputUser(req, res, next) {
	// grab from request
	const user = req.input.user || req.user;
	// error if missing
	if (!user || !_.isString(user)) {
		return next(errors.makeError("NoUser", "Missing or invalid user.", "Helpers getInputUser", 400));
	}
	// set to request
	req.user = user;
	// next!
	return next();
}
/*
// used on user subscribe routes
function _getInputUserSubscribe(req, res, next) {
	// grab termId or termName
	const termName = req.input.termName;
	const termId = req.input.termId;
	const termNameMessages = [];
	let termNameMessage;
	// make sure one or the other is set
	if (!termId && !termName) {
		return next(errors.makeError("NoTermOrName", "enter a search term to be used for the alert"));
	}
	// if termId is set and valid
	if (termId && _.isString(termId)) {
		// set to request
		req.termId = termId;
		// next!
		return next();
	}
	// if termName is a string
	else if (_.isString(termName)) {
		if (termName.length > 256) {
			termNameMessages.push({
				error: "TermNameTooLong",
				message: "make sure your search term is no more than 256 characters long",
			});
		}
		if (sns.isReservedTerm(_typeUser, termName)) {
			termNameMessages.push({
				error: "TermNameReserved",
				message: "remove the system-reserved prefix from the beginning of your search term",
			});
		}
		if (!_.isEmpty(termNameMessages)) {
			termNameMessage = transforms.safeStringify(termNameMessages);
			if (_.isError(termNameMessage)) {
				return next(termNameMessage);
			}
			return next(errors.makeError("TermNameMulti", termNameMessage));
		}
		// create term or get term by termName, get termId, then move on
		sns.createTerm(_typeUser, _source, termName, (err, termId) => {
			// handle errors
			if (err) {
				return next(err);
			}
			// otherwise
			req.termId = termId;
			// next!
			return next(err);
		});
	}
	// otherwise...
	else {
		// otherwise, error
		return next(errors.makeError("InvalidTermName", "Invalid name."));
	}
}
*/
// used on user unsubscribe routes
function _getInputUserUnsubscribe(req, res, next) {
	// grab from request
	let unsubscriptions = req.input.unsubscriptions || req.input["unsubscriptions[]"];
	// if a string, make into an array
	if (_.isString(unsubscriptions)) {
		unsubscriptions = [unsubscriptions];
	}
	// if there are no subscriptions, whoops, abort
	if (!unsubscriptions || (unsubscriptions && !unsubscriptions.length)) {
		return next(errors.makeError("NoUnsubscriptions", "Nothing to unsubscribe.", "Helpers getInputUserUnsubscribe", 400));
	}
	// set to req.unsubscriptions
	req.unsubscriptions = unsubscriptions;
	// next!
	return next();
}
// used on user endpoint routes
function _getInputUserEndpoint(req, res, next) {
	// grab from request
	const emailOld = req.input.email_old;
	const emailNew = req.input.email_new;
	// error if missing
	if (!emailOld || !_.isString(emailOld)) {
		return next(errors.makeError("NoEmail", "Missing or invalid emailOld.", "Helpers getInputUserEndpoint", 400));
	}
	if (!emailNew || !_.isString(emailNew)) {
		return next(errors.makeError("NoEmail", "Missing or invalid emailNew.", "Helpers getInputUserEndpoint", 400));
	}
	// set to request
	req.email_old = emailOld;
	req.email_new = emailNew;
	// next!
	return next();
}


// GET HINTS -------------------------------
// get array of SNS topic hints from the target hint(s)
/*
function _getTermHints(targetHint) {
	let termHints;
	const hints = _.filter(_hints, currHint => currHint.targetHint === targetHint);
	// get term hints
	const terms = _.flatten(_.map(hints, (currHint) => {
		termHints = currHint.termHint;
		// add singular hint
		if (_.isString(termHints)) {
			return currHint.termHint;
		}
		// handle arrays

		return _.map(termHints,
			hint => hint + (targetHint === "sportscombo" ? currHint.osPostfix : ""));
	}));
	return terms;
}
*/


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// GENERAL
// =============================================================================
// needed for routes that receive from AWS
Main.prototype.getRawBody = core.getRawBody;
// needed for most routes
Main.prototype.standardizeInput = core.standardizeInput;

// DEVICE
// =============================================================================
// get device hints from user agent
/*
Main.prototype.getDeviceHints = _getDeviceHints;
// get term hints
Main.prototype.getTermHints = _getTermHints;
// device input hints
Main.prototype.getInputDeviceHints = _getInputDeviceHints;
// device input data
Main.prototype.getInputDeviceData = _getInputDeviceData;
// device input send
Main.prototype.getInputDeviceSend = _getInputDeviceSend;
// device input endpoint
Main.prototype.getInputDeviceEndpoint = _getInputDeviceEndpoint;
*/

// FEEDS
// =============================================================================
// feed input detail
Main.prototype.getInputFeedDetail = _getInputFeedDetail;
// feed input search
Main.prototype.getInputFeedSearch = _getInputFeedSearch;

// SYSTEM
// =============================================================================
// system input
Main.prototype.getInputSystem = _getInputSystem;

// ADMIN
// =============================================================================
// admin input
Main.prototype.getInputAdmin = _getInputAdmin;
// admin input delete
Main.prototype.getInputAdminDelete = _getInputAdminDelete;

// USERS
// =============================================================================
// user input
Main.prototype.getInputUser = _getInputUser;
// user input subscribe
// Main.prototype.getInputUserSubscribe = _getInputUserSubscribe;
// user input unsubscribe
Main.prototype.getInputUserUnsubscribe = _getInputUserUnsubscribe;
// user input endpoint
Main.prototype.getInputUserEndpoint = _getInputUserEndpoint;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
