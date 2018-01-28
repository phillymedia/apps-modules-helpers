/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
// THIRD-PARTY -------------------------------
import { attempt } from "lodash";
import { expect } from "chai";
// APP -------------------------------
// methods to test
import {
  safeStringify,
} from "MAIN";


// PROPERTIES
// =============================================================================

const testStringify = {
  foo: "bar",
};


// METHODS
// =============================================================================
// PUBLIC -------------------------------

/**
 * Test the safeStringify method - makes appropriate calls.
 *
 */
function noErrors() {
  // call the test method
  const stringified = safeStringify(testStringify);
  // expect correct methods to be called
  expect(attempt).to.be.called;
  expect(JSON.stringify).to.be.called;
  // expect correct type
  expect(stringified).to.be.a("string");
}

/**
 * Test the safeStringify method - no errors.
 *
 */
function noThrow() {
  // expect no error
  expect(safeStringify, testStringify).to.not.throw(Error);
}

/**
 * Test the safeStringify method - returns undefined.
 *
 */
function empty() {
  // call the test method
  const stringified = safeStringify();
  // expect no error
  expect(stringified).to.be.undefined;
}


// EXPORT
// =============================================================================

export {
  empty,
  noErrors,
  noThrow,
};
