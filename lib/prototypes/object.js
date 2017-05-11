/**
 * Extend a prototype with properties.
 * Prototypes for objects.
 */

// requires
import { map, extend } from "lodash";
require("./string");
const core = require("./core");

// globals
const newObject = {};
const NewObject = {};

/**
 * Overwrite properties in the original with the given object.
 */
newObject.overwriteWith = overwriter => extend(this, overwriter);

/**
 * Get all values for a parameter object in an array.
 * Note: operates on the global Object, not on the prototype.
 */
NewObject.values = object => map(Object.keys(object), key => object[key]);

// add new object functions as properties
core.addProperties(Object.prototype, newObject);
core.addProperties(Object, NewObject);
