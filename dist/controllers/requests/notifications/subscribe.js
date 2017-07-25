"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _lodash=require("lodash"),_errors=require("../../errors");function getInput(req,res,next){var deviceId=req.input.deviceToken,userData=req.input.userData;return deviceId&&(0,_lodash.isString)(deviceId)?userData&&!(0,_lodash.isString)(userData)?next((0,_errors.makeError)("InvalidUserdata","Invalid user data.","Helpers getInputDeviceData",400)):(req.deviceId=deviceId,req.userData=userData,next()):next((0,_errors.makeError)("NoToken","Missing or invalid device token.","Helpers getInputDeviceData",400))}exports.default=getInput;