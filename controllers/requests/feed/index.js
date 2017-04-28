/**
 * PHILLLY HELPERS
 * requests/feed
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const detail = require("./detail");
const search = require("./search");


/*
* CONSTRUCTOR METHOD
* function Foo(){ // set some variables up }
*/

function Main() {

	/*
	* PUBLIC PROPERTIES
	* this.publicBar = foo;
	*/
}


/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ var self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

// FEED
// =============================================================================
// feed input detail
Main.prototype.getInputDetail = detail.getInput;
// feed input search
Main.prototype.getInputSearch = search.getInput;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
