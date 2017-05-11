/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { handleRobots } from "MAIN";
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
// HANDLE ROBOTS -------------------------------

/**
 * Test the handleRobots method.
 *
 * @method sendSuccessTest
 * @param {function} done
 * @return {function}
 */
const handleRobotsTest = {
	// data: done => prepData(done),
	status: done => robotsStatus(done),
};

/**
 * Test the prepSuccess method - data.
 *
 * @method prepData
 * @param {function} done
 * @return {function}
 */
function robotsStatus(done) {
	// mock a request
	const request = new MockExpressRequest({
		method: "GET",
		url: "/anything",
	});
	// mock a response
	const response = new MockExpressReponse();
	// call send success
	handleRobots(request, response, (err) => {
		expect(err).to.be.undefined;
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
	// make error
	describe("Handle Robots", () => {
		context("when a robot visits", () => {
			// it("sendData should have success property", handleRobotsTest.data);
			it("should return 200", handleRobotsTest.status);
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
