// DEPENDENCIES
// =============================================================================
import log from "COMP/logging";

// EMERGENCY ERROR HANDLING
// =============================================================================
// don't blow up the app, just in case
process.on("unhandledRejection", (reason, p) => {
  log.error("Unhandled Rejection from Philly Helpers module at: Promise", p, "reason:", reason);
});
// don't blow up the app, just in case
process.on("uncaughtException", (err) => {
  log.error("Unhandled Exception from Philly Helpers module:", err);
});


// PROTOTYPES
// =============================================================================
// extend the prototypes appropriately
require("./prototypes");


// EXPORTS
// =============================================================================
// ERRORS -------------------------------
import {
  // construct an Error
  makeError,
  // ensure properly formatted error
  formatError,
  // mongoose error handling
  mongooseErrorHandler,
} from "COMP/errors";

// PROMISES -------------------------------
import {
  // wait until a timeout
  until,
} from "COMP/promises";

// REQUESTS -------------------------------
import {
  // core
  // needed for routes that receive from AWS
  getRawBody,
  // feed
  // needed for most routes
  standardizeInput,
  // clickability
  getInputClickabilityCreate,
  getInputClickabilityRead,
  getInputClickabilityUpdate,
  // feed input detail
  getInputFeedDetail,
  // feed input search
  getInputFeedSearch,
  // device
  // get app hints from user agent
  getInputDeviceHints,
  // get term hints to subscribe
  getInputDeviceSubscribe,
  // get hints for publish
  getInputDevicePublish,
  // for endpoint
  getInputDeviceEndpoint,
} from "COMP/requests";

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


// RESPONSES -------------------------------
import {
  // the user is not authorized!
  sendUnauthorized,
  // the operation failed in some way, send a responses
  sendFailure,
  // the operation succeeded, prepare a successful responses
  prepSuccess,
  // the operation succeeded, send a responses
  sendSuccess,
  // disallow search engine crawlers
  handleRobots,
  // middleware for sending success messages
  handleSuccess,
  // middleware for sending failure messages
  handleFailure,
} from "COMP/responses";


// RESPONSES -------------------------------
import {
  // time a given function
  start as timerStart,
  stop as timerStop,
  // manipulate a date
  now,
  minutesFromNow,
  hoursFromNow,
  daysFromNow,
  monthsFromNow,
  endOfDay,
  endOfWeek,
  endOfMonth,
} from "COMP/timestamps";


// TRANSFORMS -------------------------------
import {
  // stringify
  safeStringify,
  // parse
  safeParse,
  // strip html
  htmlToText,
  // delete trailing slash from the end of a string
  stripTrailingSlash,
} from "COMP/transforms";


// EXPORTS
// =============================================================================
// export individually
export {
  log,
  makeError,
  formatError,
  mongooseErrorHandler,
  until,
  standardizeInput,
  getRawBody,
  getInputClickabilityCreate,
  getInputClickabilityRead,
  getInputClickabilityUpdate,
  getInputFeedDetail,
  getInputFeedSearch,
  getInputDeviceEndpoint,
  getInputDeviceHints,
  getInputDevicePublish,
  getInputDeviceSubscribe,
  sendUnauthorized,
  sendFailure,
  sendSuccess,
  prepSuccess,
  handleRobots,
  handleSuccess,
  handleFailure,
  timerStart,
  timerStop,
  now,
  minutesFromNow,
  hoursFromNow,
  daysFromNow,
  monthsFromNow,
  endOfDay,
  endOfMonth,
  endOfWeek,
  safeParse,
  safeStringify,
  htmlToText,
  stripTrailingSlash,
};
// export default
export default {
  makeError,
  formatError,
  mongooseErrorHandler,
  until,
  standardizeInput,
  getRawBody,
  getInputClickabilityCreate,
  getInputClickabilityRead,
  getInputClickabilityUpdate,
  getInputFeedDetail,
  getInputFeedSearch,
  getInputDeviceEndpoint,
  getInputDeviceHints,
  getInputDevicePublish,
  getInputDeviceSubscribe,
  sendUnauthorized,
  sendFailure,
  sendSuccess,
  prepSuccess,
  handleRobots,
  handleSuccess,
  handleFailure,
  timerStart,
  timerStop,
  now,
  minutesFromNow,
  hoursFromNow,
  daysFromNow,
  monthsFromNow,
  endOfDay,
  endOfMonth,
  endOfWeek,
  safeParse,
  safeStringify,
  htmlToText,
  stripTrailingSlash,
};
