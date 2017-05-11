/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
const errors = require("./errors");
const responses = require("./responses");
const requests = require("./requests");
const timestamps = require("./timestamps");
const transforms = require("./transforms");
const prototypes = require("./prototypes");

// errors
// describe the error methods
describe("Errors", errors.tests);

// timestamps
// describe the timestamp methods
describe("Timestamps", timestamps.tests);

// transforms
// describe the transform methods
describe("Transforms", transforms.tests);

// responses
describe("Responses", () => {
	// describe the authorization methods
	describe("Auth", responses.auth.tests);
	// describe the success methods
	describe("Success", responses.success.tests);
	// describe the failure methods
	describe("Failure", responses.failure.tests);
	// describe the robots method
	describe("Robots", responses.robots.tests);
});

// responses
describe("Requests", () => {
	// describe the core methods
	describe("Core", requests.core.tests);
	// describe the feed methods
	describe("Feed", requests.feed.tests);
	// describe the notifications methods
	// describe("Notifications", requests.notifications.tests);
	// describe the system methods
	// describe("System", requests.system.tests);
	// describe the user methods
	// describe("User", requests.user.tests);
});

// prototypes
describe("Prototypes", () => {
	// describe the string methods
	describe("String", prototypes.string.tests);
	// describe the number methods
	describe("Number", prototypes.number.tests);
});
