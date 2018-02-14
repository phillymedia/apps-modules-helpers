"use strict";Object.defineProperty(exports,"__esModule",{value:!0});function start(){return process.hrtime()}function stop(currStart,description){if(!currStart||!description)throw new Error("Bad arguments!");var elapsed=process.hrtime(currStart),timerDescription={description:description,s:elapsed[0],ms:Math.round(elapsed[1]/1e6)};return timerDescription.formatted=description+" (execution time: "+timerDescription.s+"s "+timerDescription.ms+"ms",timerDescription}function now(){return new Date}function minutesFromNow(){var minutes=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,reversed=1<arguments.length&&void 0!==arguments[1]&&arguments[1],currentTime=now();return minutes=currentTime.getMinutes()+ +((reversed?"-":"")+minutes),currentTime.setMinutes(minutes),currentTime}function hoursFromNow(){var hours=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,reversed=1<arguments.length&&void 0!==arguments[1]&&arguments[1],currentTime=now();return hours=currentTime.getHours()+ +((reversed?"-":"")+hours),currentTime.setHours(hours),currentTime}function daysFromNow(){var days=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,reversed=1<arguments.length&&void 0!==arguments[1]&&arguments[1],date=now();return days=date.getDate()+ +((reversed?"-":"")+days),date.setDate(days),date}function monthsFromNow(){var months=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,reversed=1<arguments.length&&void 0!==arguments[1]&&arguments[1],date=now();return months=date.getDate()+ +((reversed?"-":"")+30*months),date.setDate(months),date}function endOfDay(){var date=0<arguments.length&&void 0!==arguments[0]?arguments[0]:now();return date.setHours(23,59,59,999),date}function endOfWeek(){var date=daysFromNow(7);return endOfDay(date)}function endOfMonth(){var date=monthsFromNow(1);return endOfDay(date)}exports.start=start,exports.stop=stop,exports.now=now,exports.minutesFromNow=minutesFromNow,exports.hoursFromNow=hoursFromNow,exports.daysFromNow=daysFromNow,exports.monthsFromNow=monthsFromNow,exports.endOfDay=endOfDay,exports.endOfWeek=endOfWeek,exports.endOfMonth=endOfMonth;