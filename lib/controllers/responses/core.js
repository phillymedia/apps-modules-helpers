// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { isError } from "lodash";
// APP -------------------------------
import { debug as _debug } from "APP/config";
// sibling modules
import { log } from "COMP/logging";
import { formatError } from "COMP/errors";
import { safeStringify } from "COMP/transforms";


// METHODS
// =============================================================================
// PRIVATE -------------------------------

/**
 * Set headers if they haven't already been sent.
 *
 * @param {object} res
 * @param {string} contentType
 */
function setHeaders(res, contentType = "application/json") {
  if (!res.headersSent) {
    res.setHeader("Content-Type", contentType);
  }
}


// PUBLIC -------------------------------

/**
 * Send a response to an unauthorized call.
 *
 * @param {Object} res - The response.
 * @return {Function}
 */
function sendUnauthorized(req, res) {
  setHeaders(res);
  res.status(403);
  res.send("Forbidden");
  res.end();
}

/**
 * Send a response to an error.
 *
 * @param {Object} err - The error, if any.
 * @param {Object} req - The original request.
 * @param {Object} res - The response.
 */
function sendFailure(err, req, res) {
  // save the server response
  const savedRes = res;
  // ensure properly formatted error
  err = formatError(err, savedRes);
  // stringify input
  let input = safeStringify({
    error: err.code,
    message: err.message,
    surfaceMessage: err.surfaceMessage,
  });
  // this will either be a nice object, or a new error
  if (isError(input)) {
    log.error("Could not stringify original error!", input.stack);
    input = safeStringify({
      error: input.code,
      message: input.message,
      surfaceMessage: false,
    });
  }
  // send error
  setHeaders(res);
  res.status(err.statusCode);
  res.send(input);
  res.end();
}

/**
* Prepare a successful response.
*
* @param {Object} req - The original request.
* @param {Object} res - The response.
* @return {Function}
*/
function prepSuccess(req, res, next) {
  // grab sendData
  const sentData = res.sendData;
  // set up the data
  res.sendData = { success: true, data: sentData };
  // next!
  return next();
}

/**
* Send a successful response.
*
* @param {Object} res - The response.
* @param {Object} sendData - The data.
*/
function sendSuccess(req, res) { // eslint-disable-line consistent-return
  // res.sendData = { data: "some kind of data" };
  if (_debug) {
    log.info("Success!", "sent data:", res.sendData);
  }
  const input = safeStringify(res.sendData);
  // unset(res, "sendData");
  if (isError(input)) {
    log.error("Could not send success!", input.stack);
    return sendFailure(input, req, res);
  }
  // send success
  setHeaders(res);
  res.status(200);
  res.send(input);
  res.end();
}


// EXPORTS
// =============================================================================

export {
  sendUnauthorized,
  sendFailure,
  prepSuccess,
  sendSuccess,
};
