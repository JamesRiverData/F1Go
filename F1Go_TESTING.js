console.log("Version .01 2026-06-04 at 12:42 pm");

import { populateFieldAfterDateTime, scheduleMultipleFieldPopulations } from './.idea/fieldHidePopulateWithTextAfterDate.js';

// Console logs for debugging
console.log('F1Go.js has been loaded');

globalThis.scheduleMultipleFieldPopulations = scheduleMultipleFieldPopulations;
globalThis.populateFieldAfterDateTime = populateFieldAfterDateTime;