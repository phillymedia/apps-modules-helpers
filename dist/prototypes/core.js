"use strict";var _lodash=require("lodash");function addProperties(original,extension){(0,_lodash.forOwn)(extension,function(value,key){Object.defineProperty(original,key,{value:extension[key],writable:!0})})}exports.addProperties=addProperties;