/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import transforms from "./transforms";
import { makeError, formatError } from "./errors";
import { until } from "./promises";
import { info, error, debug } from "./logging";
import { string, number } from "./prototypes";
import { core, feed, notifications } from "./requests";
import { auth, success, failure, robots } from "./responses";
import {
  now,
  minutesFromNow,
  hoursFromNow,
  daysFromNow,
  monthsFromNow,
  endOfDay,
  endOfWeek,
  endOfMonth,
  timerStart,
  timerStop,
} from "./timestamps";

// errors
// describe the error methods
describe("Errors", () => {
  describe("Make Error", makeError);
  describe("Format Error", formatError);
});

// promises
// describe the promise methods
describe("Promises", () => {
  describe("Until", until);
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
  describe("Now", now);
  describe("Mintes From Now", minutesFromNow);
  describe("Hours from Now", hoursFromNow);
  describe("Days From Now", daysFromNow);
  describe("Months From Now", monthsFromNow);
  describe("End of Day", endOfDay);
  describe("End of Week", endOfWeek);
  describe("End of Month", endOfMonth);
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
  describe("Notifications", () => {
    describe("Publish", notifications.publish);
    describe("Subscribe", notifications.subscribe);
  });
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
