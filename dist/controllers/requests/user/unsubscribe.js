"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _lodash=require("lodash"),_errors=require("../../errors");function getInput(req,res,next){var unsubscriptions=req.input.unsubscriptions||req.input["unsubscriptions[]"];return((0,_lodash.isString)(unsubscriptions)&&(unsubscriptions=[unsubscriptions]),!unsubscriptions||unsubscriptions&&!unsubscriptions.length)?next((0,_errors.makeError)("NoUnsubscriptions","Nothing to unsubscribe.","Helpers getInputUserUnsubscribe",400)):(req.unsubscriptions=unsubscriptions,next())}exports.default=getInput;