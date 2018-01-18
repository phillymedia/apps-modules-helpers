/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

// dependencies
import { sendFailure } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import chai from "chai";
// http plugin
chai.use(require("chai-http"));
// expect
const { expect } = chai;


// an error
const testError = new Error("A test error!");


// METHODS
// =============================================================================

/**
 * Test the sendFailure method.
 *
 * @method failureHeaders
 * @param {function} done
 * @return {function}
 */
function failureHeaders(done) {
	// mock a request
	const { request, response } = this;
	// call send success
	sendFailure(testError, request, response);
	// proper headers
	expect(response).to.have.header("content-type", /json/);
	// done
	done();
}

/**
 * Test the sendFailure method.
 *
 * @method failureHeaders
 * @param {function} done
 * @return {function}
 */
function failureStatus(done) {
	// mock a request
	const { request, response } = this;
	// call send success
	sendFailure(testError, request, response);
	// expect response to be 500 (default for errors)
	expect(response.statusCode).to.equal(500);
	// done
	done();
}

/**
 * Test the sendFailure method - handles bad errors.
 *
 * @method failureHeadersError
 * @param {function} done
 * @return {function}
 */
function failureHeadersError(done) {
	// mock a request
	const { request, response } = this;
	// call send success
	sendFailure(null, request, response);
	// headers
	expect(response).to.have.header("content-type", /json/);
	// done
	done();
}

/**
 * Test the sendFailure method - handles bad errors.
 *
 * @method failureStatusError
 * @param {function} done
 * @return {function}
 */
function failureStatusError(done) {
	// mock a request
	const { request, response } = this;
	// call send success
	sendFailure(null, request, response);
	// expect response to be 501 (means bad error was passed in)
	expect(response.statusCode).to.equal(501);
	// done
	done();
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	beforeEach(function () {
		this.request = new MockExpressRequest({
			method: "GET",
			url: "/anything",
		});
		this.response = new MockExpressReponse();
	});
	// send failure
	describe("Send Failure", () => {
		context("when sending (default) error", () => {
			it("should return json headers", failureHeaders);
			it("should return 500 status", failureStatus);
		});
		context("when no error is sent", () => {
			it("should return json headers", failureHeadersError);
			it("should return 501 status", failureStatusError);
		});
	});
}


// EXPORT
// =============================================================================

export default tests;
