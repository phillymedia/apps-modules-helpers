/**
 * PHILLLY HELPERS
 * requests/user
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const core = require("./core");
// const subscribe = require("./subscribe");
const unsubscribe = require("./unsubscribe");
const endpoint = require("./endpoint");


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

// USERS
// =============================================================================
// user input
Main.prototype.getInput = core.getInput;
// user input subscribe
// Main.prototype.getInputUserSubscribe = subscribe.getInput;
// user input unsubscribe
Main.prototype.getInputUnsubscribe = unsubscribe.getInput;
// user input endpoint
Main.prototype.getInputEndpoint = endpoint.getInput;


/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
