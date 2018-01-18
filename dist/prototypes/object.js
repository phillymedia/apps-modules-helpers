"use strict";

var _lodash = require("lodash");

require("./string"); // requires

var core = require("./core");

// globals
var newObject = {};
var NewObject = {};

// Overwrite properties in the original with the given object.
newObject.overwriteWith = function (overwriter) {
  return (0, _lodash.extend)(undefined, overwriter);
};

// Get all values for a parameter object in an array.
// Note: operates on the global Object, not on this prototype.
NewObject.values = function (object) {
  return (0, _lodash.map)(Object.keys(object), function (key) {
    return object[key];
  });
};

// add new object functions as properties
core.addProperties(Object.prototype, newObject);
core.addProperties(Object, NewObject);