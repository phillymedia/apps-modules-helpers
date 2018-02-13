"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.formatError=exports.makeError=void 0;var _mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose),_lodash=require("lodash"),_config=require("../config"),_logging=require("./logging"),_transforms=require("./transforms");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function printError(err){var printableError="";_config.debug?(_logging.log.info(err.statusCode+" Error occurred."),printableError+=err.statusCode+" Error: ",printableError+=err.stack,err.loc&&(printableError+="\nLocation: "+err.loc),err.warn?_logging.log.error(printableError,"\nError was improperly formatted.\nOriginal error:",err.warn,"\nOriginal response: ",err.res):_logging.log.error(printableError)):(_logging.log.error(err.code+": "+err.message),err.warn&&_logging.log.error("Error was improperly formatted.\nOriginal error:",err.warn,"\nOriginal response:",err.res))}function mongooseErrorHandler(err){return err instanceof _mongoose2.default.Error.ValidationError?(printError(err.errors),makeError("InvalidFields",(0,_transforms.safeStringify)(err.errors),"error > mongooseErrorHandler",1100,!0)):err}function soapErrorHandler(err){return(0,_lodash.includes)(err.message,"soap:Server")?(0,_lodash.includes)(err.message,_config.clickability.errors.badCredentials)?makeError("BadCredentials","Cannot log into API.","error > soapErrorHandler",2100,!0):(0,_lodash.includes)(err.message,_config.clickability.errors.duplicateUser)?makeError("UserExists","Cannot create new subscriber with those parameters.","error > soapErrorHandler",2200,!0):(0,_lodash.includes)(err.message,_config.clickability.errors.incomplete)||(0,_lodash.includes)(err.message,_config.clickability.errors.noResults)?makeError("NoUser","Cannot find a subscriber for those parameters.","error > soapErrorHandler",2300,!0):makeError("SoapFault","There is a problem with that request. "+err,"error > soapErrorHandler",2900,!0):err}function makeError(code,message,loc,statusCode,surfaceMessage){code&&message||(message="Couldn't create error.",code="BadError",statusCode=416);var err=new Error(message);return err.code=code,err.statusCode=statusCode?err.statusCode=statusCode:500,loc&&(err.loc=loc,(0,_lodash.isNumber)(loc)&&(err.statusCode=loc,err.loc="")),surfaceMessage&&(err.surfaceMessage=!0),err}function formatError(err,res){if(!err)err=makeError("UnknownError","Something went wrong. Refer to logs.","Error formatError",501),err.res=res;else if(!err.code||!err.statusCode){err=mongooseErrorHandler(err),err=soapErrorHandler(err);var warn=err;err.code&&"Error"!==err.code||(err.code="UnknownError"),err.message||(err.message="Something went wrong. Refer to logs."),err.loc?(0,_lodash.isNumber)(err.loc)&&(err.statusCode=err.loc,err.loc="Error formatError"):err.loc="Error formatError",err=makeError(err.code,err.message,err.loc),err.warn=warn,err.res=res}return err}exports.makeError=makeError,exports.formatError=formatError;