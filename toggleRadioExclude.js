const globalHiddenOptions = new Map(); // Shared map for tracking hidden radios
const instances = []; // Shared array for tracking all function instances

function toggleRadioExclude(fieldName) {
    const hiddenOptions = new Set(); // Track options hidden by this function

    // Register this instance
    instances.push({ fieldName, hiddenOptions, toggleRadioOptions });

    function waitForField() {
        const interval = setInterval(() => {
            const controllingRadio = document.querySelector(`input[name="${fieldName}"]`);
            if (controllingRadio) {
                clearInterval(interval); // Stop looking once the field is found
                initialize(); // Run the initialization logic
                monitorElement(`input[name="${fieldName}"]`, waitForField);
            }
        }, 500); // Check every 500ms
    }

    function monitorElement(selector, waitForField) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (!element) {
                clearInterval(interval);
                waitForField(); // Restart the wait process
            }
        }, 500); // Check every 500ms
    }

    function initialize() {
        const controllingRadios = document.querySelectorAll(`input[name="${fieldName}"]`);

        controllingRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const selectedValue = radio.value;
                recheckAllInstances(selectedValue); // Trigger rechecking logic
            });
        });

        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                resetControllingRadio();
            });
        });

        const selectedControllingRadio = document.querySelector(`input[name="${fieldName}"]:checked`);
        if (selectedControllingRadio) {
            toggleRadioOptions(selectedControllingRadio.value);
        }
    }

    function toggleRadioOptions(selectedValue) {
        const allRadios = document.querySelectorAll(`input[type="radio"]:not([name="${fieldName}"])`);

        allRadios.forEach(radio => {
            const optionKey = `${radio.name}:${radio.value}`;
            const isHiddenByOther = globalHiddenOptions.has(optionKey);

            if (radio.value.includes(selectedValue)) {
                if (!isHiddenByOther) {
                    hiddenOptions.add(radio);
                    globalHiddenOptions.set(optionKey, true); // Mark as hidden globally
                    radio.closest('.radio').style.display = 'none';
                }
            } else if (hiddenOptions.has(radio)) {
                hiddenOptions.delete(radio);
                globalHiddenOptions.delete(optionKey); // Unmark as hidden globally
                radio.closest('.radio').style.display = '';
            }
        });
    }

    function resetControllingRadio() {
        const selectedControllingRadio = document.querySelector(`input[name="${fieldName}"]:checked`);
        if (selectedControllingRadio) {
            toggleRadioOptions(selectedControllingRadio.value);
        }
    }

    function recheckAllInstances(selectedValue) {
        instances.forEach(instance => {
            const selectedControllingRadio = document.querySelector(`input[name="${instance.fieldName}"]:checked`);
            if (selectedControllingRadio) {
                instance.toggleRadioOptions(selectedControllingRadio.value);
            }
        });
    }

    waitForField();
}

export { toggleRadioExclude };
