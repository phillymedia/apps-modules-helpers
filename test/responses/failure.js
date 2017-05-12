/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { sendFailure } from "MAIN";
// chai
import chai from "chai";
// chai plugins
chai.use(require("chai-http"));
// expect method
const expect = chai.expect;
// express request/response mocking
const MockExpressRequest = require("mock-express-request");
const MockExpressReponse = require("mock-express-response");

// an error
const testError = new Error("A test error!");


// MAIN METHODS
// =============================================================================
// SEND FAILURE -------------------------------

/**
 * Test the sendFailure method.
 *
 * @method sendFailureTest
 * @param {function} done
 * @return {function}
 */
const sendFailureTest = {
	headers: done => failureHeaders(done),
	status: done => failureStatus(done),
	headersError: done => failureHeadersError(done),
	statusError: done => failureStatusError(done),
};

/**
 * Test the sendFailure method.
 *
 * @method failureHeaders
 * @param {function} done
 * @return {function}
 */
function failureHeaders(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
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
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
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
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
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
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
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
	// send failure
	describe("Send Failure", () => {
		context("when sending (default) error", () => {
			it("should return json headers", sendFailureTest.headers);
			it("should return 500 status", sendFailureTest.status);
		});
		context("when no error is sent", () => {
			it("should return json headers", sendFailureTest.headersError);
			it("should return 501 status", sendFailureTest.statusError);
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
