/* eslint-env mocha */
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
	emptyErrorsType: detailEmptyErrorsType,
	emptyErrorsCode: detailEmptyErrorsCode,
	noErrors: detailNoErrors,
	hasId: detailHasId,
	matchesId: detailMatchesId,
};

/**
 * Test the getInputFeedDetail method - errors when no id.
 *
 * @method detailEmptyErrors
 * @param {function} done
 * @return {function}
 */
function detailEmptyErrorsType(done) {
	// get the request
	const request = this.badRequest;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedDetail(request, response, (err) => {
		expect(err).to.be.an("error");
		return done();
	});
}

/**
 * Test the getInputFeedDetail method - errors when no id.
 *
 * @method detailEmptyErrors
 * @param {function} done
 * @return {function}
 */
function detailEmptyErrorsCode(done) {
	// get the request
	const request = this.badRequest;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedDetail(request, response, (err) => {
		expect(err).to.have.property("code").that.equals("NoId");
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
		expect(err).to.be.undefined;
		return done();
	});
}

/**
 * Test the getInputFeedDetail method - id not undefined.
 *
 * @method detailHasId
 * @param {function} done
 * @return {function}
 */
function detailHasId(done) {
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
		expect(request).to.have.property("id").that.is.not.undefined;
		return done();
	});
}

/**
 * Test the getInputFeedDetail method - matching id.
 *
 * @method detailMatchesId
 * @param {function} done
 * @return {function}
 */
function detailMatchesId(done) {
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
	emptyErrorsType: searchEmptyErrorsType,
	emptyErrorsCode: searchEmptyErrorsCode,
	noErrors: searchNoErrors,
	hasTerm: searchHasTerm,
	matchesTerm: searchMatchesTerm,
};

/**
 * Test the getInputFeedSearch method - errors when no search term.
 *
 * @method searchEmptyErrorsType
 * @param {function} done
 * @return {function}
 */
function searchEmptyErrorsType(done) {
	// get the request
	const request = this.badRequest;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedSearch(request, response, (err) => {
		expect(err).to.be.an("error");
		return done();
	});
}

/**
 * Test the getInputFeedDetail method - errors when no search term.
 *
 * @method searchEmptyErrorsCode
 * @param {function} done
 * @return {function}
 */
function searchEmptyErrorsCode(done) {
	// get the request
	const request = this.badRequest;
	// mock a response
	const response = new MockExpressReponse();
	// call test method
	getInputFeedSearch(request, response, (err) => {
		expect(err).to.have.property("code").that.equals("NoSearchTerm");
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
		expect(err).to.be.undefined;
		return done();
	});
}

/**
 * Test the getInputFeedSearch method - search term is not undefined.
 *
 * @method searchHasTerm
 * @param {function} done
 * @return {function}
 */
function searchHasTerm(done) {
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
		expect(request).to.have.property("search").that.is.not.undefined;
		return done();
	});
}

/**
 * Test the getInputFeedSearch method - search term is correct.
 *
 * @method searchMatchesTerm
 * @param {function} done
 * @return {function}
 */
function searchMatchesTerm(done) {
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
				it("should error", getInputFeedDetailTest.emptyErrorsType);
				it("should be correct error", getInputFeedDetailTest.emptyErrorsCode);
			});
			context("when data sent", () => {
				it("should not error", getInputFeedDetailTest.noErrors);
				it("should have ID property", getInputFeedDetailTest.hasId);
				it("should match test ID", getInputFeedDetailTest.matchesId);
			});
		});
		// for search
		describe("Search", () => {
			context("when no data sent", () => {
				it("should error", getInputFeedSearchTest.emptyErrorsType);
				it("should be correct error", getInputFeedSearchTest.emptyErrorsCode);
			});
			context("when data sent", () => {
				it("should not error", getInputFeedSearchTest.noErrors);
				it("should have search property", getInputFeedSearchTest.hasTerm);
				it("should match test search", getInputFeedSearchTest.matchesTerm);
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
