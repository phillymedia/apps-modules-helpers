/* eslint-env mocha */

// DEPENDENCIES
// =============================================================================
// htmlToText
import {
	empty as htmlEmpty,
	noErrors as htmlNoErrors,
	noThrow as htmlNoThrow,
} from "./htmlToText";
// parse
import {
	hasError as parseHasError,
	noErrors as parseNoErrors,
	noThrow as parseNoThrow,
} from "./parse";
// stringify
import {
	empty as stringifyEmpty,
	noErrors as stringifyNoErrors,
	noThrow as stringifyNoThrow,
} from "./stringify";
// stripslash
import {
	empty as stripSlashEmpty,
	noErrors as stripSlashNoErrors,
	noThrow as stripSlashNoThrow,
} from "./stripSlash";


// TESTS
// =============================================================================

/**
 * Errors test methods.
 *
 * @method tests
 */
function tests() {
	// safe stringify
	describe("Safe Stringify", () => {
		context("when passed correct data", () => {
			it("does not throw", stringifyNoThrow);
			it("returns expected data", stringifyNoErrors);
		});
		context("when passed nothing", () => {
			it("returns empty string", stringifyEmpty);
		});
	});
	// safe parse
	describe("Safe Parse", () => {
		context("when passed correct data", () => {
			it("does not throw", parseNoThrow);
			it("returns expected data", parseNoErrors);
		});
		context("when passed nothing", () => {
			it("returns an error", parseHasError);
		});
	});
	// html to text
	describe("HTML to Text", () => {
		context("when passed correct data", () => {
			it("does not throw", htmlNoThrow);
			it("returns expected data", htmlNoErrors);
		});
		context("when passed nothing", () => {
			it("returns empty string", htmlEmpty);
		});
	});
	// strip trailing slash
	describe("Strip Trailing Slash", () => {
		context("when passed correct data", () => {
			it("does not throw", stripSlashNoThrow);
			it("returns expected data", stripSlashNoErrors);
		});
		context("when passed nothing", () => {
			it("returns empty string", stripSlashEmpty);
		});
	});
}


// EXPORT
// =============================================================================

export default tests;
