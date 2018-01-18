/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { sendUnauthorized } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import { expect } from "chai";


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
	// get mocks
	const { request, response } = this;
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
	// mock requests
	beforeEach(function () {
		this.request = new MockExpressRequest({
			method: "GET",
			url: "/anything",
		});
		this.response = new MockExpressReponse();
	});
	// make error
	describe("Send Unauthorized", () => {
		context("when unauthorized", () => {
			it("should return 403 status", sendUnauthorizedTest);
		});
	});
}


// EXPORT
// =============================================================================

export default tests;
