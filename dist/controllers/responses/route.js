"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRobots = exports.handleSuccess = exports.handleFailure = undefined;

var _core = require("./core");

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Handle successful requests.
 *
 * @param {Object} req - The original request.
 * @param {Object} res - The response.
 */
function handleSuccess(req, res, next) {
  return (0, _core.sendSuccess)(req, res, next);
}

/**
 * Handle error requests.
 *
 * @param {Object} req - The original request.
 * @param {Object} res - The response.
 */
// DEPENDENCIES
// =============================================================================
// APP -------------------------------
// sibling modules
function handleFailure(err, req, res, next) {
  return (0, _core.sendFailure)(err, req, res, next);
}

/**
 * Handle robot requests.
 *
 * @param {Object} req - The original request.
 * @param {Object} res - The response.
 */
function handleRobots(req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
  res.end();
}

// EXPORTS
// =============================================================================

exports.handleFailure = handleFailure;
exports.handleSuccess = handleSuccess;
exports.handleRobots = handleRobots;