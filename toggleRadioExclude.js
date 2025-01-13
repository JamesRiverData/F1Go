const globalHiddenOptions = new Map(); // Shared map to track visibility globally

function toggleRadioExclude(fieldName) {
    function waitForField() {
        const interval = setInterval(() => {
            const controllingRadio = document.querySelector(`input[name="${fieldName}"]`);
            if (controllingRadio) {
                console.log("Found the controlling radio field. Initializing...");
                clearInterval(interval);
                initialize();
                monitorElement(`input[name="${fieldName}"]`, waitForField);
            } else {
                console.log("Controlling radio field not found yet. Retrying...");
            }
        }, 500);
    }

    function monitorElement(selector, waitForField) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`${selector} is found. Monitoring continues...`);
            } else {
                console.log(`${selector} is gone or hidden. Running waitForField...`);
                clearInterval(interval);
                waitForField();
            }
        }, 500);
    }

    function initialize() {
        const controllingRadios = document.querySelectorAll(`input[name="${fieldName}"]`);

        controllingRadios.forEach(radio => {
            console.log(`Adding change event listener to controlling radio with value: ${radio.value}`);
            radio.addEventListener('change', event => {
                const selectedValue = event.target.value;
                console.log(`Controlling radio changed to: ${selectedValue}`);
                toggleRadioOptions(selectedValue);
                console.log("Ending Radio Caps Function");
            });
        });

        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            console.log(`Adding change event listener to radio with value: ${radio.value}`);
            radio.addEventListener('change', () => {
                console.log(`Radio button with value ${radio.value} changed`);
                resetControllingRadio();
            });
        });

        const selectedControllingRadio = document.querySelector(`input[name="${fieldName}"]:checked`);
        if (selectedControllingRadio) {
            console.log(`Initializing visibility state with selected controlling radio: ${selectedControllingRadio.value}`);
            toggleRadioOptions(selectedControllingRadio.value);
        } else {
            console.log("No controlling radio button is selected during initialization.");
        }
    }

    function toggleRadioOptions(selectedValue) {
        console.log(`Toggling options based on the selected value: ${selectedValue}`);
        const allRadios = document.querySelectorAll(`input[type="radio"]:not([name="${fieldName}"])`);

        allRadios.forEach(radio => {
            const optionValue = radio.value;

            if (optionValue.includes(selectedValue)) {
                console.log(`Hiding radio button with value: ${optionValue}`);
                setGlobalHiddenState(radio, true); // Track as hidden globally
            } else if (shouldUnhide(radio)) {
                console.log(`Showing radio button with value: ${optionValue}`);
                setGlobalHiddenState(radio, false); // Track as visible globally
            } else {
                console.log(`Skipping unhiding radio button with value: ${optionValue} as it shouldn't be unhidden.`);
            }
        });
    }

    function resetControllingRadio() {
        console.log("Resetting controlling radio buttons...");
        const selectedControllingRadio = document.querySelector(`input[name="${fieldName}"]:checked`);
        if (selectedControllingRadio) {
            console.log(`Currently selected controlling radio: ${selectedControllingRadio.value}`);
            toggleRadioOptions(selectedControllingRadio.value);
        } else {
            console.log("No controlling radio button is currently selected.");
        }
    }

    // Utility to set the global hidden state
    function setGlobalHiddenState(radio, hidden) {
        const radioKey = getRadioKey(radio);
        if (hidden) {
            globalHiddenOptions.set(radioKey, true);
            radio.closest('.radio').style.display = 'none';
        } else {
            globalHiddenOptions.delete(radioKey);
            radio.closest('.radio').style.display = '';
        }
    }

    // Utility to determine if a radio should be unhidden
    function shouldUnhide(radio) {
        const radioKey = getRadioKey(radio);
        return !globalHiddenOptions.has(radioKey);
    }

    // Generate a unique key for a radio button
    function getRadioKey(radio) {
        return `${radio.name}:${radio.value}`;
    }

    waitForField();
}

export { toggleRadioExclude };
