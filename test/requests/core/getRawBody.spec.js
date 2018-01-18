/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
import { getRawBody } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import { expect } from "chai";


// PROPERTIES
// =============================================================================

const testRawSettings = {
	method: "POST",
	headers: {
		"content-type": "text/plain",
	},
};
const testRawBody = "Some readable data.";


// METHODS
// =============================================================================

/**
 * Test the getRawBody method - falls through when no body.
 *
 * @param {function} done
 * @return {function}
 */
function emptyNoErrors(done) {
	// get the request/response
	const { emptyRequest: request, response } = this;
	// call send success
	getRawBody(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(err).to.not.exist;
		expect(response.rawBody).to.not.exist;
		return done();
	});
}


/**
 * Test the getRawBody method - no errors.
 *
 * @param {function} done
 * @return {function}
 */
function noErrors(done) {
	// get the request/response
	const { request, response } = this;
	// call send success
	getRawBody(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(err).to.not.exist;
		return done();
	});
}

/**
 * Test the getRawBody method - returns raw body.
 *
 * @param {function} done
 * @return {function}
 */
function hasBody(done) {
	// get the request/response
	const { request, response } = this;
	// call send success
	getRawBody(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(request.rawBody).to.equal(testRawBody);
		return done();
	});
}


// TESTS
// =============================================================================

/**
 * Core test methods.
 *
 * @method tests
 */
function tests() {
	// before
	beforeEach(function () {
		// mock a request
		this.request = new MockExpressRequest(testRawSettings);
		// write to the stream
		this.request.write(testRawBody);
		// end the stream
		this.request.end();
		// mock an empty request
		this.emptyRequest = new MockExpressRequest();
		// mock a response
		this.response = new MockExpressReponse();
	});
	// get raw body
	context("when no data sent", function () {
		it("should not error", emptyNoErrors);
	});
	context("when data sent", function () {
		it("should not error", noErrors);
		it("should have raw body property", hasBody);
	});
}


// EXPORT
// =============================================================================

export default tests;
