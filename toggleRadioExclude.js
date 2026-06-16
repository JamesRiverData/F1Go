const globalHiddenOptions = new Map();
const instances = [];

function toggleRadioExclude(fieldName) {
    const hiddenOptions = new Set();
    const instanceId = Symbol(fieldName);

    instances.push({ fieldName, hiddenOptions, toggleRadioOptions });

    function getAllRadios() {
        return Array.from(document.querySelectorAll('input[type="radio"]'));
    }

    function getRadiosByName(name) {
        return getAllRadios().filter(radio => radio.name === name);
    }

    function getCheckedRadio(name) {
        return getRadiosByName(name).find(radio => radio.checked);
    }

    function getOptionKey(radio) {
        return `${radio.name}:${radio.value}`;
    }

    function getRadioWrapper(radio) {
        return radio.closest('.radio') || radio.closest('label') || radio.parentElement;
    }

    function hardUncheckRadio(radio) {
        radio.value = null;
        radio.otherText = null;
        radio.otherValue= null;
        radio.removeAttribute('checked');

        radio.dispatchEvent(new Event('input', { bubbles: true }));
        radio.dispatchEvent(new Event('change', { bubbles: true }));

        if (window.jQuery) {
            window.jQuery(radio).prop('checked', false).removeAttr('checked').trigger('change');
        }
    }

    function clearRadioGroup(groupName) {
        getRadiosByName(groupName).forEach(radio => {
            hardUncheckRadio(radio);
        });
    }

    function getAffectedGroupNames() {
        const controllingValues = getRadiosByName(fieldName).map(radio => radio.value);
        const affectedGroups = new Set();

        getAllRadios().forEach(radio => {
            if (radio.name === fieldName) return;

            const isAffectedOption = controllingValues.some(value => {
                return radio.value.includes(value);
            });

            if (isAffectedOption) {
                affectedGroups.add(radio.name);
            }
        });

        return affectedGroups;
    }

    function clearAffectedGroups() {
        const affectedGroups = getAffectedGroupNames();

        affectedGroups.forEach(groupName => {
            clearRadioGroup(groupName);
        });
    }

    function waitForField() {
        const interval = setInterval(() => {
            const controllingRadio = getRadiosByName(fieldName)[0];

            if (controllingRadio) {
                clearInterval(interval);
                initialize();
                monitorElement(waitForField);
            }
        }, 500);
    }

    function monitorElement(waitForField) {
        const interval = setInterval(() => {
            const controllingRadio = getRadiosByName(fieldName)[0];

            if (!controllingRadio) {
                clearInterval(interval);
                waitForField();
            }
        }, 500);
    }

    function initialize() {
        const controllingRadios = getRadiosByName(fieldName);

        controllingRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                clearAffectedGroups();
                recheckAllInstances();
            });
        });

        const selectedControllingRadio = getCheckedRadio(fieldName);

        if (selectedControllingRadio) {
            clearAffectedGroups();
            toggleRadioOptions(selectedControllingRadio.value);
        }
    }

    function toggleRadioOptions(selectedValue) {
        const allRadios = getAllRadios().filter(radio => radio.name !== fieldName);

        allRadios.forEach(radio => {
            const optionKey = getOptionKey(radio);
            const radioWrapper = getRadioWrapper(radio);

            if (!radioWrapper) return;

            if (radio.value.includes(selectedValue)) {
                hiddenOptions.add(optionKey);

                if (!globalHiddenOptions.has(optionKey)) {
                    globalHiddenOptions.set(optionKey, new Set());
                }

                globalHiddenOptions.get(optionKey).add(instanceId);

                hardUncheckRadio(radio);
                radioWrapper.style.display = 'none';
            } else if (hiddenOptions.has(optionKey)) {
                hiddenOptions.delete(optionKey);

                const hiders = globalHiddenOptions.get(optionKey);

                if (hiders) {
                    hiders.delete(instanceId);

                    if (hiders.size === 0) {
                        globalHiddenOptions.delete(optionKey);
                        radioWrapper.style.display = '';
                    }
                }
            }
        });
    }

    function recheckAllInstances() {
        instances.forEach(instance => {
            const selectedControllingRadio = getCheckedRadio(instance.fieldName);

            if (selectedControllingRadio) {
                instance.toggleRadioOptions(selectedControllingRadio.value);
            }
        });
    }

    waitForField();
}

export { toggleRadioExclude };