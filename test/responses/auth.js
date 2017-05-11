/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { sendUnauthorized } from "MAIN";
// chai
import chai from "chai";
// chai plugins
chai.use(require("chai-http"));
// expect method
const expect = chai.expect;
// express request/response mocking
const MockExpressRequest = require("mock-express-request");
const MockExpressReponse = require("mock-express-response");


// MAIN METHODS
// =============================================================================
// SEND UNAUTHORIZED -------------------------------

/**
 * Test the sendUnauthorized method.
 *
 * @method sendUnauthorizedTest
 * @return {function}
 */
function sendUnauthorizedTest() {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send unauthorized
	sendUnauthorized(request, response);
	// expect response to be 403
	expect(response.statusCode).to.equal(403);
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	// make error
	describe("Send Unauthorized", () => {
		context("when unauthorized", () => {
			it("should return 403 status", sendUnauthorizedTest);
		});
	});
}


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = {
	tests,
};
