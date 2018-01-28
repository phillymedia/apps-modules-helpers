"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _logging = require("../../logging");

var _errors = require("../../errors");

var _transforms = require("../../transforms");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the system route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// DEPENDENCIES
// =============================================================================
// third-party libraries
function getInput(req, res, next) {
  // grab header x-amz-sns-message-type
  var reqCat = req.headers["x-amz-sns-message-type"];
  var message = void 0;
  // possible types: SubscriptionConfirmation, Notification, UnsubscribeConfirmation
  // (used only when the subscription is deleted from the term).
  // give err an initial value
  var err = null;
  // check reqCat
  switch (reqCat) {
    case "SubscriptionConfirmation":
      req.cat = "subscribe";
      _logging.log.info("Subscribing?");
      // grab request items from req.input
      req.token = req.input.Token;
      req.term = req.input.TopicArn;
      // next!
      break;
    case "UnsubscribeConfirmation":
      req.cat = "unsubscribe";
      _logging.log.info("Unsubscribing?");
      // don"t really need to do anything
      break;
    case "Notification":
      req.cat = "notification";
      _logging.log.info("Notification!");
      message = (0, _transforms.safeParse)(req.input.Message);
      // error?
      if ((0, _lodash.isError)(message)) {
        err = (0, _errors.makeError)("InvalidRequest", "Invalid request input:" + (0, _transforms.safeStringify)(req.input), "Helpers getInputSystem > safeParse", 400);
      }
      // false just means the input was empty
      if (!message) {
        err = (0, _errors.makeError)("InvalidRequest", "Input was empty", "Helpers getInputSystem", 400);
      }
      // else, set request items
      req.source = message.Resource;
      req.endpoint = message.EndpointArn;
      req.event = message.EventType;
      req.failure = message.FailureType;
      // next!
      break;
    default:
      err = (0, _errors.makeError)("InvalidRequest", "Invalid request.", "Helpers getInputSystem", 500);
  }
  return next(err);
}

// EXPORTS
// =============================================================================

// sibling modules
exports.default = getInput;