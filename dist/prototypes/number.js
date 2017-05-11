"use strict";

/**
* PHILLY NOTIFICATIONS APP
* a sub module of prototypes
* Contains the string prototype methods.
**/

// SETUP
// =============================================================================

// DEPENDENCIES
// =============================================================================
// APP -------------------------------
var core = require("./core");

/*
* PRIVATE PROPERTIES
* const _privateBar;
*/

// global object
var newNumber = {};

/*
* PRIVATE METHODS
* function _privateBar(){ const self = this; return this.foo; }
*/

/*
* PUBLIC METHODS
* Foo.prototype.publicBar = function(){ const self = this; return self.foo; }
* Foo.prototype.publicShell = function(){ return _privateBar.call(this, // any other variables); }
*/

/**
 * Turn a number (1) into an ordinal (1st).
 *
 * @method pcToOrdinal
 * @return {string}
**/
function pcToOrdinal() {
  var num = this;
  var ordinals = ["th", "st", "nd", "rd"];
  var divider = num % 100;
  return num + (ordinals[(divider - 20) % 10] || ordinals[divider] || ordinals[0]);
}

/*
* EXPORT THE FINISHED OBJECT
* module.exports = object;
*/

// make ordinal, aka 1 to 1st
newNumber.pcToOrdinal = pcToOrdinal;

// add functions to number as properties
core.addProperties(Number.prototype, newNumber);