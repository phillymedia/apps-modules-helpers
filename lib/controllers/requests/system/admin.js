// DEPENDENCIES
// =============================================================================
// third-party libraries
import { isError } from "lodash";
// sibling modules
import { makeError } from "COMP/errors";
import { safeParse, safeStringify } from "COMP/transforms";

// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the system/admin route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
  // grab item
  let { item } = req.input;
  // if no item, abort!
  if (!item) {
    return next(makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
  }
  // whatever the result, make into object if string
  item = safeParse(req.input.item);
  // error?
  if (isError(item)) {
    return next(makeError("InvalidRequest", `Invalid request input:${safeStringify(req.input)}`, "Helpers getInputAdmin > safeParse", 400));
  }
  // false just means the input was empty
  if (!item) {
    return next(makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
  }
  // otherwise, set to request
  req.item = item;
  // next!
  return next();
}

/**
 * Get the inputs from the system/admin/delete route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInputDelete(req, res, next) {
  // grab item
  let { item } = req.input;
  // if no item, abort!
  if (!item) {
    return next(makeError("NoInputSpecified", "Nothing to work with.", "Helpers getInputAdmin", 400));
  }
  // whatever the result, make into object if string
  item = safeParse(req.input.item);
  // error?
  if (isError(item)) {
    return next(makeError("InvalidRequest", `Invalid request input:${safeStringify(req.input)}`, "Helpers getInputAdmin > safeParse", 400));
  }
  // false just means the input was empty
  if (!item) {
    return next(makeError("InvalidRequest", "Input was empty", "Helpers getInputAdmin", 400));
  }
  // otherwise, set to request
  req.item = item;
  // next!
  return next();
}


// EXPORTS
// =============================================================================

export {
  getInput,
  getInputDelete,
};
