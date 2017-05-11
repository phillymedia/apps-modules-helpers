/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import {
	getRawBody,
	standardizeInput,
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
// GET RAW BODY -------------------------------
const testRawSettings = {
	method: "POST",
	headers: {
		"content-type": "text/plain",
	},
};
const testRawBody = "Some readable data.";

// STANDARDIZE INPUT -------------------------------
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


// MAIN METHODS
// =============================================================================
// GET RAW BODY -------------------------------

/**
 * Test the getRawBody method.
 *
 * @constant getRawBodyTest
 * @param {function} done
 * @return {function}
 */
const getRawBodyTest = {
	emptyNoErrors: rawBodyEmptyNoErrors,
	hasNoBody: rawBodyEmptyNoBody,
	noErrors: rawBodyNoErrors,
	hasBody: rawBodyHasBody,
	matchesBody: rawBodyMatchesBody,
};

/**
 * Test the getRawBody method - falls through when no body.
 *
 * @method rawBodyEmptyNoErrors
 * @param {function} done
 * @return {function}
 */
function rawBodyEmptyNoErrors(done) {
	// mock a request
	const request = new MockExpressRequest();
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	getRawBody(request, response, (err) => {
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
 * Test the getRawBody method - no raw body when no body.
 *
 * @method rawBodyEmptyNoBody
 * @param {function} done
 * @return {function}
 */
function rawBodyEmptyNoBody(done) {
	// mock a request
	const request = new MockExpressRequest();
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	getRawBody(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(response.rawBody).to.be.undefined;
		return done();
	});
}


/**
 * Test the getRawBody method - no errors.
 *
 * @method rawBodyNoErrors
 * @param {function} done
 * @return {function}
 */
function rawBodyNoErrors(done) {
	// mock a request
	const request = new MockExpressRequest(testRawSettings);
	// write to the stream
	request.write(testRawBody);
	// end the stream
	request.end();
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	getRawBody(request, response, (err) => {
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
 * Test the getRawBody method - returns raw body.
 *
 * @method rawBodyHasBody
 * @param {function} done
 * @return {function}
 */
function rawBodyHasBody(done) {
	// mock a request
	const request = new MockExpressRequest(testRawSettings);
	// write to the stream
	request.write(testRawBody);
	// end the stream
	request.end();
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	getRawBody(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(request.rawBody).to.not.be.undefined;
		return done();
	});
}

/**
 * Test the getRawBody method - returns matching raw body.
 *
 * @method rawBodyMatchesBody
 * @param {function} done
 * @return {function}
 */
function rawBodyMatchesBody(done) {
	// mock a request
	const request = new MockExpressRequest(testRawSettings);
	// write to the stream
	request.write(testRawBody);
	// end the stream
	request.end();
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	getRawBody(request, response, (err) => {
		if (err) {
			return done(err);
		}
		expect(request.rawBody).to.equal(testRawBody);
		return done();
	});
}

// STANDARDIZE INPUT -------------------------------

/**
 * Test the standardizeInput method.
 *
 * @constant standardizeInputTest
 * @param {function} done
 * @return {function}
 */
const standardizeInputTest = {
	emptyErrorsType: inputEmptyType,
	emptyErrorsCode: inputEmptyCode,
	noErrors: inputNoErrors,
	inputMatches,
};

/**
 * Test the standardizeInput method - empty input should error.
 *
 * @method inputEmpty
 * @param {function} done
 * @return {function}
 */
function inputEmptyType(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	standardizeInput(request, response, (err) => {
		expect(err).to.be.an("error");
		done();
	});
}
/**
 * Test the standardizeInput method - empty input should be specific error.
 *
 * @method inputEmpty
 * @param {function} done
 * @return {function}
 */
function inputEmptyCode(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	standardizeInput(request, response, (err) => {
		expect(err).to.have.property("code").that.equals("NoContent");
		done();
	});
}

/**
 * Test the standardizeInput method - returns matching raw body.
 *
 * @method inputNoErrors
 * @param {function} done
 * @return {function}
 */
function inputNoErrors(done) {
	// mock a request
	const request = new MockExpressRequest(testInputSettings);
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	standardizeInput(request, response, (err) => {
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
 * Test the standardizeInput method - input matches.
 *
 * @method inputMatches
 * @param {function} done
 * @return {function}
 */
function inputMatches(done) {
	// mock a request
	const request = new MockExpressRequest(testInputSettings);
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	standardizeInput(request, response, (err) => {
		// handle errors
		if (err) {
			return done(err);
		}
		// otherwise...
		expect(request.input).to.not.be.undefined;
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
	// get raw body
	describe("Get Raw Body", () => {
		context("when no data sent", () => {
			it("should not error", getRawBodyTest.emptyNoErrors);
			it("should not have raw body property", getRawBodyTest.hasNoBody);
		});
		context("when data sent", () => {
			it("should not error", getRawBodyTest.noErrors);
			it("should have raw body property", getRawBodyTest.hasBody);
			it("should match test raw body", getRawBodyTest.matchesBody);
		});
	});
	// standardize input
	describe("Standardize Input", () => {
		context("when no params sent", () => {
			it("should error", standardizeInputTest.emptyErrorsType);
			it("should be correct error", standardizeInputTest.emptyErrorsCode);
		});
		context("when params sent", () => {
			it("should not error", standardizeInputTest.noErrors);
			it("should have matching input", standardizeInputTest.inputMatches);
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
