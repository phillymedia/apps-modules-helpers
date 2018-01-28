// DEPENDENCIES
// =============================================================================
// third-party libraries
import { isString } from "lodash";
// sibling modules
import { makeError } from "COMP/errors";


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Get the inputs from the user/subscribe route.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function}
 */
// only when pulling feed detail
function getInput(req, res, next) {
  // grab termId or termName
  const { termName, termId } = req.input;
  // make sure one or the other is set
  if (!termId && !termName) {
    return next(makeError("NoTermOrName", "enter a search term to be used for the alert"));
  }
  // if termId is set and valid
  if (termId && isString(termId)) {
    // set to request
    req.termId = termId;
    // next!
    return next();
  }
  /*
  // if termName is a string
  else if (isString(termName)) {
    const termNameMessages = [];
    let termNameMessage;
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
    if (!isEmpty(termNameMessages)) {
      termNameMessage = transforms.safeStringify(termNameMessages);
      if (isError(termNameMessage)) {
        return next(termNameMessage);
      }
      return next(makeError("TermNameMulti", termNameMessage));
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
  */
  // otherwise, error
  return next(makeError("InvalidTermName", "Invalid name."));
}


// EXPORTS
// =============================================================================

export default getInput;
