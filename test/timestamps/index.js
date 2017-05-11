/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

// dependencies
import { expect } from "chai";
const {
	timerStart,
	timerStop,
	now,
	minutesFromNow,
} = require("MAIN");

// code and message are required
const testTimer = {
	description: "This is a test timer.",
	s: 0,
};


// MAIN METHODS
// =============================================================================
// TIMER START -------------------------------

/**
 * Test the timerStart method.
 *
 * @constant startTest
 */
const startTest = {
	noErrors: startNoErrors,
	type: startType,
};

/**
 * Test the timerStart method - no errors.
 *
 * @method startNoErrors
 */
function startNoErrors() {
	// expect no error
	expect(timerStart).to.not.throw(Error);
}

/**
 * Test the timerStart method - type.
 *
 * @method startType
 */
function startType() {
	// create an error
	const timer = timerStart();
	// expect array of numbers
	expect(timer).to.be.an("array").with.a.length.valueOf(2);
}

// TIMER STOP -------------------------------

/**
 * Test the timerStop method.
 *
 * @constant stopTest
 */
const stopTest = {
	type: stopType,
	matchesDesc: stopMatchesDesc,
	matchesTime: stopMatchesTime,
	errors: stopErrors,
};

/**
 * Test the timerStop method - is an object.
 *
 * @method stopType
 */
function stopType() {
	// create an error
	const timed = timerStop(timerStart(), testTimer.description);
	// expect to be an object
	expect(timed).to.be.an("object");
}

/**
 * Test the timerStop method - matches description.
 *
 * @method stopMatchesDesc
 * @return {function}
 */
function stopMatchesDesc() {
	// create an error
	const timed = timerStop(timerStart(), testTimer.description);
	// expect description to match
	expect(timed.description).to.equal(testTimer.description);
}

/**
 * Test the timerStop method - no time elapsed.
 *
 * @method stopMatchesTime
 */
function stopMatchesTime() {
	// create an error
	const timed = timerStop(timerStart(), testTimer.description);
	// expect no time to have elapsed
	expect(timed).to.have.a.property("s").that.equals(testTimer.s);
}

/**
 * Test the timerStop method - errors.
 *
 * @method stopErrors
 */
function stopErrors() {
	// expect error when no arguments passed
	expect(timerStop).to.throw(Error);
}

// NOW -------------------------------

/**
 * Test the now method.
 *
 * @constant nowTest
 */
const nowTest = {
	type: nowType,
	noErrors: nowNoErrors,
};

/**
 * Test the now method - is a date.
 *
 * @method nowType
 */
function nowType() {
	// get the now()
	const currNow = now();
	// expect to be a date
	expect(currNow).to.be.a("date");
}

/**
 * Test the now method - no errors.
 *
 * @method nowNoErrors
 * @return {function}
 */
function nowNoErrors() {
	// expect description to match
	expect(now).to.not.throw(Error);
}

// MINUTES FROM NOW -------------------------------

/**
 * Test the minutesFromNow method.
 *
 * @constant minutesFromTest
 */
const minutesFromTest = {
	type: minutesType,
	ooo: minutesOOO,
	noErrors: minutesNoErrors,
	stillNoErrors: minutesStillNoErrors,
};

/**
 * Test the minutesFromNow method - is a date.
 *
 * @method minutesType
 */
function minutesType() {
	// get the minutes from now
	const minutes = minutesFromNow(15);
	// expect to be a date
	expect(minutes).to.be.a("date");
}

/**
 * Test the minutesFromNow method - is a date.
 *
 * @method minutesOOO
 */
function minutesOOO() {
	// get the minutes from now
	minutesFromNow(15);
	// expect to call now
	expect(now).to.be.called;
	// getminutes
	expect(Date.getMinutes).to.be.called;
	// setminutes
	expect(Date.setMinutes).to.be.called;
}


/**
 * Test the minutesFromNow method - is a date.
 *
 * @method minutesNoErrors
 */
function minutesNoErrors() {
	// expect to not throw an error
	expect(minutesFromNow, 15).to.not.throw(Error);
}

/**
 * Test the minutesFromNow method - is a date.
 *
 * @method minutesStillNoErrors
 */
function minutesStillNoErrors() {
	// expect to still not throw an error
	expect(minutesFromNow).to.not.throw(Error);
}


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	describe("Timers", () => {
		// timer start
		describe("Start", () => {
			it("does not error", startTest.noErrors);
			it("returns an array", startTest.type);
		});
		// timer stop
		describe("Stop", () => {
			// everything going right
			context("when structured correctly", () => {
				it("returns an object", stopTest.type);
				it("matches description", stopTest.matchesDesc);
				it("elapses no time", stopTest.matchesTime);
			});
			// missing arguments
			context("when missing arguments", () => {
				it("throws an error", stopTest.errors);
			});
		});
	});
	// now
	describe("Now", () => {
		it("does not error", nowTest.noErrors);
		it("returns a date", nowTest.type);
	});
	// minutes from now
	describe("Minutes From Now", () => {
		// everything going right
		context("when structured correctly", () => {
			it("does not error", minutesFromTest.noErrors);
			it("returns a date", minutesFromTest.type);
			it("calls now, getMinutes, setMinutes", minutesFromTest.ooo);
		});
		// missing arguments
		context("when missing arguments", () => {
			it("just set minutes to 0 and work", minutesFromTest.stillNoErrors);
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
