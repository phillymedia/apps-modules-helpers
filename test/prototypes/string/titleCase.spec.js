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
 * Test the pcToTitleCase method - exists.
 *
 * @return {function}
 */
function exists() {
  // expect method to exist on the prototype
  expect(String).to.respondTo("pcToTitleCase");
}

/**
 * Test the pcToTitleCase method - type.
 *
 * @return {function}
 */
function matches() {
  const title = testsStrings.titleCase.pcToTitleCase();
  expect(title).to.be.a("string");
  expect(title).to.equal(testsStrings.titleCased);
}

/**
 * Test the pcToTitleCase method - not on the object prototype.
 *
 * @return {function}
 */
function errors() {
  expect(Object).to.not.respondTo("pcToTitleCase");
}


// TESTS
// =============================================================================

/**
 * String Prototype test methods.
 *
 */
function tests() {
  // to title case
  it("exists on the prototype", exists);
  // everything going right
  context("when called on a String", () => {
    it("returns a correctly-formatted string", matches);
  });
  // errors
  context("when called on an Object", () => {
    it("does not exist", errors);
  });
}


// EXPORT
// =============================================================================

export default tests;
