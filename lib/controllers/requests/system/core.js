// DEPENDENCIES
// =============================================================================
// third-party libraries
import { isError } from "lodash";
// sibling modules
import { log } from "COMP/logging";
import { makeError } from "COMP/errors";
import { safeParse, safeStringify } from "COMP/transforms";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

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
		log.info("Subscribing?");
		// grab request items from req.input
		req.token = req.input.Token;
		req.term = req.input.TopicArn;
		// next!
		break;
	case "UnsubscribeConfirmation":
		req.cat = "unsubscribe";
		log.info("Unsubscribing?");
		// don"t really need to do anything
		break;
	case "Notification":
		req.cat = "notification";
		log.info("Notification!");
		message = safeParse(req.input.Message);
		// error?
		if (isError(message)) {
			err = makeError("InvalidRequest", `Invalid request input:${safeStringify(req.input)}`, "Helpers getInputSystem > safeParse", 400);
		}
		// false just means the input was empty
		if (!message) {
			err = makeError("InvalidRequest", "Input was empty", "Helpers getInputSystem", 400);
		}
		// else, set request items
		req.source = message.Resource;
		req.endpoint = message.EndpointArn;
		req.event = message.EventType;
		req.failure = message.FailureType;
		// next!
		break;
	default:
		err = makeError("InvalidRequest", "Invalid request.", "Helpers getInputSystem", 500);
	}
	return next(err);
}


// EXPORTS
// =============================================================================

export default getInput;
