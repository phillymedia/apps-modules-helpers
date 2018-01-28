/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import transforms from "./transforms";
import { makeError, formatError } from "./errors";
import { info, error, debug } from "./logging";
import { string, number } from "./prototypes";
import { core, feed } from "./requests";
import { auth, success, failure, robots } from "./responses";
import { minutesFromNow, now, timerStart, timerStop } from "./timestamps";

// errors
// describe the error methods
describe("Errors", () => {
  describe("Make Error", makeError);
  describe("Format Error", formatError);
});

// logs
// describe the log methods
describe("Logging", () => {
  describe("Info", info);
  describe("Error", error);
  describe("Debug", debug);
});

// timestamps
// describe the timestamp methods
describe("Timestamps", () => {
  describe("Mintes From Now", minutesFromNow);
  describe("Now", now);
  describe("Timer Start", timerStart);
  describe("Timer Stop", timerStop);
});

// transforms
// describe the transform methods
describe("Transforms", transforms);

// responses
describe("Responses", () => {
  // describe the authorization methods
  describe("Auth", auth);
  // describe the success methods
  describe("Success", success);
  // describe the failure methods
  describe("Failure", failure);
  // describe the robots method
  describe("Robots", robots);
});

// responses
describe("Requests", () => {
  // describe the core methods
  describe("Core", () => {
    // get raw body
    describe("Get Raw Body", core.getRawBody);
    // standardize input
    describe("Standardize Input", core.standardizeInput);
  });
  // describe the feed methods
  describe("Feed", () => {
    // detail
    describe("Detail", feed.detail);
    // search
    describe("Search", feed.search);
  });
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
  describe("String", () => {
    describe("Get Byte Count", string.getByteCount);
    describe("Title Case", string.titleCase);
    describe("Truncate", string.truncate);
  });
  // describe the number methods
  describe("Number", number);
});
