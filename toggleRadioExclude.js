const globalHiddenOptions = new Map();
const instances = [];

function toggleRadioExclude(fieldName) {
    const hiddenOptions = new Set();

    instances.push({ fieldName, hiddenOptions, toggleRadioOptions });

    function waitForField() {
        const interval = setInterval(() => {
            const controllingRadio = document.querySelector(`input[name="${fieldName}"]`);
            if (controllingRadio) {
                clearInterval(interval);
                initialize();
                monitorElement(`input[name="${fieldName}"]`, waitForField);
            }
        }, 500);
    }

    function monitorElement(selector, waitForField) {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (!element) {
                clearInterval(interval);
                waitForField();
            }
        }, 500);
    }

    function initialize() {
        const controllingRadios = document.querySelectorAll(`input[name="${fieldName}"]`);

        controllingRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                recheckAllInstances();
            });
        });

        const selectedControllingRadio = document.querySelector(`input[name="${fieldName}"]:checked`);
        if (selectedControllingRadio) {
            toggleRadioOptions(selectedControllingRadio.value);
        }
    }

    function clearRadioGroup(groupName) {
        const radios = document.querySelectorAll(`input[type="radio"][name="${groupName}"]`);

        radios.forEach(radio => {
            radio.checked = false;

            // Helps form builders recognize that the value changed
            radio.dispatchEvent(new Event('input', { bubbles: true }));
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

    function toggleRadioOptions(selectedValue) {
        const allRadios = document.querySelectorAll(`input[type="radio"]:not([name="${fieldName}"])`);
        const affectedGroups = new Set();

        allRadios.forEach(radio => {
            if (radio.value.includes(selectedValue)) {
                affectedGroups.add(radio.name);
            }
        });

        affectedGroups.forEach(groupName => {
            clearRadioGroup(groupName);
        });

        allRadios.forEach(radio => {
            const optionKey = `${radio.name}:${radio.value}`;
            const isHiddenByOther = globalHiddenOptions.has(optionKey);
            const radioWrapper = radio.closest('.radio');

            if (!radioWrapper) return;

            if (radio.value.includes(selectedValue)) {
                if (!isHiddenByOther) {
                    hiddenOptions.add(radio);
                    globalHiddenOptions.set(optionKey, true);
                    radioWrapper.style.display = 'none';
                }
            } else if (hiddenOptions.has(radio)) {
                hiddenOptions.delete(radio);
                globalHiddenOptions.delete(optionKey);
                radioWrapper.style.display = '';
            }
        });
    }

    function recheckAllInstances() {
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