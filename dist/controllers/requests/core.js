"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRawBody=exports.standardizeInput=void 0;var _lodash=require("lodash"),_config=require("../../config"),_errors=require("../errors"),_transforms=require("../transforms");function buildInput(req){var loopable,input={};if((0,_lodash.isEmpty)(req.params)&&(0,_lodash.isEmpty)(req.body)&&(0,_lodash.isEmpty)(req.query)&&req.rawBody){if(_config.debug&&console.log("Using raw body."),loopable=(0,_transforms.safeParse)(req.rawBody),(0,_lodash.isError)(loopable))return loopable;loopable=[loopable]}else!(0,_lodash.isEmpty)(req.body)&&req.body.userAgent&&(0,_lodash.unset)(req.body,["userAgent"]),loopable=[req.params,req.body,req.query];return(0,_lodash.forEach)(loopable,function(currInput){if(currInput=(0,_transforms.safeParse)(currInput),(0,_lodash.isError)(currInput))throw(0,_errors.makeError)("InvalidRequest","Invalid request input:"+(0,_transforms.safeStringify)(input),"Helpers buildInput > safeParse",400);inputHasContent(currInput)&&(0,_lodash.forOwn)(currInput,function(value,key){input[key]=value})}),!(0,_lodash.isEmpty)(input)&&input}function inputHasContent(input){return input&&(0,_lodash.isObject)(input)&&!(0,_lodash.isEmpty)(input)}function standardizeInput(req,res,next){var input=(0,_lodash.attempt)(buildInput,req);return(0,_lodash.isError)(input)?next(input):input?(req.input=input,next()):next((0,_errors.makeError)("NoContent","Empty request.","Helpers standardizeInput",400))}function getRawBody(req,res,next){var contentType=req.headers["content-type"]||"",mime=contentType.split(";")[0];if("text/plain"!==mime)return next();var data="";return req.setEncoding("utf8"),req.on("data",function(chunk){data+=chunk}),req.on("end",function(){req.rawBody=data,next()})}exports.standardizeInput=standardizeInput,exports.getRawBody=getRawBody;