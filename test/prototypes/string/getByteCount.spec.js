/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
import { expect } from "chai";
// just run the app
import "MAIN";

// code and message are required
const testsStrings = {
  titleCase: "SOME WORDS TO BE TITLE CASED",
  titleCased: "Some Words To Be Title Cased",
  truncate: "A long sentence full of lots of words to be cut down to a smaller sentence.",
  truncated: "A long...",
  truncatedWithout: "A long sen...",
  badInput: { foo: "bar" },
  byteCount: 75,
};


// METHODS
// =============================================================================

/**
 * Test the pcGetByteCount method - exists.
 *
 * @return {function}
 */
function exists() {
  // expect method to exist on the prototype
  expect(String).to.respondTo("pcGetByteCount");
}

/**
 * Test the pcGetByteCount method - matches.
 *
 * @return {function}
 */
function matches() {
  const counted = testsStrings.truncate.pcGetByteCount();
  expect(counted).to.be.a("number");
  expect(counted).to.equal(testsStrings.byteCount);
}

/**
 * Test the pcGetByteCount method - not on the object prototype.
 *
 * @return {function}
 */
function errors() {
  expect(Object).to.not.respondTo("pcGetByteCount");
}


// TESTS
// =============================================================================

/**
 * String Prototype test methods.
 *
 */
function tests() {
  it("exists on the prototype", exists);
  // everything going right
  context("when called on a String", () => {
    it("returns the correct count", matches);
  });
  // errors
  context("when called on an Object", () => {
    it("does not exist", errors);
  });
}


// EXPORT
// =============================================================================

export default tests;
