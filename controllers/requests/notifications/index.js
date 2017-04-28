/**
 * PHILLLY HELPERS
 * requests/feed
 * Hopefully reusable class of functions.
 */

// MOST DEPENDENCIES
// =============================================================================
const core = require("./core");
const endpoint = require("./endpoint");
const publish = require("./publish");
const subscribe = require("./subscribe");


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

/*
* EXPORTED METHODS
* Foo.prototype.publicBar = publicBar;
*/

// NOTIFICATIONS
// =============================================================================
// core
Main.prototype.getInput = core.getInput;
// endpoint
Main.prototype.getInputEndpoint = endpoint.getInput;
// publish
Main.prototype.getInputPublish = publish.getInput;
// subscribe
Main.prototype.getInputSubscribe = subscribe.getInput;

/*
* EXPORT THE FINISHED CLASS
* module.exports = className;
*/

module.exports = new Main();
