function toggleRadioExclude(fieldName) {
    const hiddenOptions = new Set(); // Track options hidden by this function

    function waitForField() {
        const interval = setInterval(() => {
            const controllingRadio = document.querySelector(`input[name="${fieldName}"]`);
            if (controllingRadio) {
                console.log("Found the controlling radio field. Initializing...");
                clearInterval(interval); // Stop looking once the field is found
                initialize(); // Run the initialization logic
                monitorElement(`input[name="${fieldName}"]`, waitForField);
            } else {
                console.log("Controlling radio field not found yet. Retrying...");
            }
        }, 500); // Check every 500ms
    }

    function monitorElement(selector, waitForField) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`${selector} is found. Monitoring continues...`);
            } else {
                console.log(`${selector} is gone or hidden. Running waitForField...`);
                clearInterval(interval);
                waitForField(); // Restart the wait process
            }
        }, 500); // Check every 500ms
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
                hiddenOptions.add(radio); // Track the hidden radio
                radio.closest('.radio').style.display = 'none';
            } else if (hiddenOptions.has(radio)) {
                console.log(`Showing radio button with value: ${optionValue}`);
                radio.closest('.radio').style.display = '';
                hiddenOptions.delete(radio); // Remove from the tracked hidden options
            } else {
                console.log(`Skipping unhiding radio button with value: ${optionValue} as it wasn't hidden by this function.`);
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

    waitForField();
}

export { toggleRadioExclude };
