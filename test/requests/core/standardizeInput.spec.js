/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

// DEPENDENCIES
// =============================================================================
import { standardizeInput } from "MAIN";
// express request/response mocking
import MockExpressReponse from "mock-express-response";
import MockExpressRequest from "mock-express-request";
// chai
import { expect } from "chai";


// PROPERTIES
// =============================================================================

const testInputSettings = {
	method: "POST",
	params: {
		id: 123,
	},
	query: {
		search: "peanut butter",
	},
	body: {
		articleId: 456,
	},
};


// METHODS
// =============================================================================

/**
 * Test the standardizeInput method - empty input should error.
 *
 * @param {function} done
 * @return {function}
 */
function hasError(done) {
	// get the request/response
	const { getRequest: request, response } = this;
	// call send success
	standardizeInput(request, response, (err) => {
		expect(err).to.be.an("error");
		expect(err).to.have.property("code").that.equals("NoContent");
		done();
	});
}

/**
 * Test the standardizeInput method - input matches.
 *
 * @param {function} done
 * @return {function}
 */
function hasInput(done) {
	// get the request/response
	const { request, response } = this;
	// call send success
	standardizeInput(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(request.input).to.exist;
		expect(request.input).to.have.property("id").that.equals(testInputSettings.params.id);
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
	before(function () {
		// mock a request
		this.request = new MockExpressRequest(testInputSettings);
		// mock a GET request
		this.getRequest = new MockExpressRequest({
			method: "GET",
		});
		// mock a response
		this.response = new MockExpressReponse();
	});
	// standardize input
	context("when no params sent", () => {
		it("should error", hasError);
	});
	context("when params sent", () => {
		it("should have matching input", hasInput);
	});
}


// EXPORT
// =============================================================================

export default tests;
