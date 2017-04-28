/**
 * PHILLLY HELPERS
 * requests/feed
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const core = require("./core");
const admin = require("./admin");


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

// SYSTEM
// =============================================================================
// system input
Main.prototype.getInput = core.getInput;

// ADMIN
// =============================================================================
// admin input
Main.prototype.getInputAdmin = admin.getInput;
// admin input - delete
Main.prototype.getInputAdminDelete = admin.getInputDelete;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
