/*
	router.route("/subscriptions")
		// global to this route only
		.all(helpers.standardizeInput)
		// view subscriptions for device
		//.get(main.getSubscriptions)
		// create subscription for device
		.post(helpers.getInputDeviceHints, helpers.getInputDeviceData, main.subscribe)
		;
*/

/* eslint-disable no-unused-expressions */

// dependencies
import {
	standardizeInput,
	getInputFeedDetail,
	getInputFeedSearch,
} from "MAIN";
// chai
import chai from "chai";
// chai plugins
chai.use(require("chai-http"));
// expect method
const expect = chai.expect;
// express request/response mocking
const MockExpressRequest = require("mock-express-request");
const MockExpressReponse = require("mock-express-response");

/*
export { default as getInput } from "./core";
export { default as getInputEndpoint } from "./endpoint";
export { default as getInputPublish } from "./publish";
export { default as getInputSubscribe } from "./subscribe";

*/

// PRIVATE VARIABLES
// =============================================================================
// GET INPUT FEED DETAIL/SEARCH -------------------------------
const testInputSettings = {
	method: "POST",
	body: {
		search: "peanut butter",
		id: [
			456,
			891,
		],
	},
};


// MAIN METHODS
// =============================================================================
// GET INPUT FEED DETAIL -------------------------------

/**
 * Test the getInputFeedDetail method.
 *
 * @constant getInputFeedDetailTest
 * @param {function} done
 * @return {function}
 */
const getInputFeedDetailTest = {
	emptyErrors: detailEmptyErrors,
	noErrors: detailNoErrors,
};

/**
 * Test the getInputFeedDetail method - errors when no id.
 *
 * @method detailEmptyErrors
 * @param {function} done
 * @return {function}
 */
function detailEmptyErrors(done) {
	// get the request
	const request = this.badRequest;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedDetail(request, response, (err) => {
		expect(err).to.be.an("error").which.has.property("code").that.equals("NoId");
		return done();
	});
}

/**
 * Test the getInputFeedDetail method - no errors.
 *
 * @method detailNoErrors
 * @param {function} done
 * @return {function}
 */
function detailNoErrors(done) {
	// get the request
	const request = this.request;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedDetail(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(err).to.not.exist;
		expect(request).to.have.property("id").that.equals(testInputSettings.body.id);
		return done();
	});
}


// GET INPUT FEED SEARCH -------------------------------

/**
 * Test the getInputFeedSearch method.
 *
 * @constant getInputFeedSearchTest
 * @param {function} done
 * @return {function}
 */
const getInputFeedSearchTest = {
	emptyErrors: searchEmptyErrors,
	noErrors: searchNoErrors,
};

/**
 * Test the getInputFeedSearch method - errors when no search term.
 *
 * @method searchEmptyErrorsType
 * @param {function} done
 * @return {function}
 */
function searchEmptyErrors(done) {
	// get the request
	const request = this.badRequest;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedSearch(request, response, (err) => {
		expect(err).to.be.an("error").which.has.property("code").that.equals("NoSearchTerm");
		return done();
	});
}

/**
 * Test the getInputFeedSearch method - no errors.
 *
 * @method searchNoErrors
 * @param {function} done
 * @return {function}
 */
function searchNoErrors(done) {
	// get the request
	const request = this.request;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedSearch(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(err).to.not.exist;
		expect(request).to.have.property("search").that.equals(testInputSettings.body.search);
		return done();
	});
}


// TESTS
// =============================================================================

/**
 * Feed test methods.
 *
 * @method tests
 */
function tests() {
	// get input
	describe("Get Input", () => {
		beforeEach(function (done) {
			// mock some requests
			this.request = new MockExpressRequest(testInputSettings);
			this.badRequest = new MockExpressRequest();
			// add input to bad request
			this.badRequest.input = {};
			// mock a response
			const response = new MockExpressReponse();
			// call standardize input
			standardizeInput(this.request, response, (err) => {
				if (err) {
					return done(err);
				}
				// otherwise...
				return done();
			});
		});
		// for detail
		describe("Detail", () => {
			context("when no data sent", () => {
				it("should error", getInputFeedDetailTest.emptyErrors);
			});
			context("when data sent", () => {
				it("should not error", getInputFeedDetailTest.noErrors);
			});
		});
		// for search
		describe("Search", () => {
			context("when no data sent", () => {
				it("should error", getInputFeedSearchTest.emptyErrors);
			});
			context("when data sent", () => {
				it("should not error", getInputFeedSearchTest.noErrors);
			});
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
