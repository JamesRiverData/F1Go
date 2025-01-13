console.log("Version 1.53");
// Imports at the top
import { dropDownCaps } from './dropDownCaps.js';
import { hideElement } from './hideElement.js';
import { hideHeader } from './hideHeader.js';
import { ip } from './ip.js';
import { radioButtonCaps } from './radioButtonCaps.js';
import { radioVar } from './radioVar.js';
import { waitForElement } from './waitForElement.js';
import { noSubmit } from './noSubmit.js';
import { funSubmit } from './funSubmit.js';
import { yesSubmit} from './yesSubmit.js';
import { hidePastCheckboxes } from './hidePastCheckboxes.js';
import { toggleRadioExclude } from './toggleRadioExclude.js';
import { toggleRadioInclude } from './toggleRadioInclude.js';
//import { radioMoneyButtonCaps } from './radioMoneyButtonCaps.js';

// Console logs for debugging
console.log('F1Go.js has been loaded');


// Attach functions to global scope
globalThis.ip = ip;
globalThis.radioVar = radioVar;
globalThis.waitForElement = waitForElement;
globalThis.hideElement = hideElement;
globalThis.radioButtonCaps = radioButtonCaps;
globalThis.dropDownCaps = dropDownCaps;
globalThis.hideHeader = hideHeader;
globalThis.noSubmit = noSubmit;
globalThis.funSubmit = funSubmit;
globalThis.yesSubmit = yesSubmit;
globalThis.hidePastCheckboxes = hidePastCheckboxes;
globalThis.toggleRadioExclude = toggleRadioExclude;
globalThis.toggleRadioInclude = toggleRadioInclude;