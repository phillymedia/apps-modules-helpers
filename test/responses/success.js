/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { prepSuccess, sendSuccess } from "MAIN";
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
// PREP SUCCESS -------------------------------

/**
 * Test the prepSuccess method.
 *
 * @method prepSuccessTest
 * @param {function} done
 * @return {function}
 */
const prepSuccessTest = {
	data: done => prepData(done),
	status: done => prepStatus(done),
};

/**
 * Test the prepSuccess method - data.
 *
 * @method prepData
 * @param {function} done
 * @return {function}
 */
function prepData(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	prepSuccess(request, response, (err) => {
		expect(err).to.be.undefined;
		expect(response.sendData).to.have.property("success").that.is.true;
		done();
	});
}

/**
 * Test the prepSuccess method - status.
 *
 * @method prepStatus
 * @param {function} done
 * @return {function}
 */
function prepStatus(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	prepSuccess(request, response, (err) => {
		expect(err).to.be.undefined;
		expect(response.statusCode).to.equal(200);
		done();
	});
}

// SEND SUCCESS -------------------------------

/**
 * Test the sendSuccess method.
 *
 * @method sendSuccessTest
 * @param {function} done
 * @return {function}
 */
const sendSuccessTest = {
	headers: done => successHeaders(done),
	status: done => successStatus(done),
};

/**
 * Test the sendSuccess method.
 *
 * @method sendSuccessTest
 * @param {function} done
 * @return {function}
 */
function successHeaders(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	sendSuccess(request, response, (err) => {
		expect(err).to.be.undefined;
		// console.log(response);
		expect(response).to.have.header("content-type", /json/);
		done();
	});
}

/**
 * Test the sendSuccess method.
 *
 * @method sendSuccessTest
 * @param {function} done
 * @return {function}
 */
function successStatus(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	sendSuccess(request, response, (err) => {
		expect(err).to.be.undefined;
		// console.log(response);
		expect(response.statusCode).to.equal(200);
		done();
	});
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	// prep success
	describe("Prep Success", () => {
		context("when no data sent", () => {
			it("sendData should have success property", prepSuccessTest.data);
			it("should return 200", prepSuccessTest.status);
		});
	});
	// send success
	describe("Send Success", () => {
		context("when no data sent data", () => {
			it("should have correct headers", sendSuccessTest.headers);
			it("should return 200", sendSuccessTest.status);
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
