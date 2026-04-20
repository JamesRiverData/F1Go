const globalHiddenOptions = new Map(); // Shared map for tracking hidden radios
const instances = []; // Shared array for tracking all function instances

function toggleRadioExclude(fieldName, targetNames = []) {
    const hiddenOptions = new Set(); // Track options hidden by this function

    // Register this instance
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
                const selectedValue = radio.value;

                clearTargetRadioGroups(); // ✅ only clears intended groups
                recheckAllInstances(selectedValue);
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

    function clearTargetRadioGroups() {
        targetNames.forEach(name => {
            const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
            if (checkedRadio) {
                checkedRadio.checked = false;
            }
        });
    }

    function toggleRadioOptions(selectedValue) {
        const allRadios = targetNames
            .map(name => document.querySelectorAll(`input[name="${name}"]`))
            .flat();

        allRadios.forEach(radio => {
            const optionKey = `${radio.name}:${radio.value}`;
            const isHiddenByOther = globalHiddenOptions.has(optionKey);

            // 👉 adjust this condition if needed
            if (radio.value === selectedValue) {
                if (!isHiddenByOther) {
                    hiddenOptions.add(radio);
                    globalHiddenOptions.set(optionKey, true);

                    // ✅ also clear if it's currently selected
                    if (radio.checked) {
                        radio.checked = false;
                    }

                    radio.closest('.radio').style.display = 'none';
                }
            } else if (hiddenOptions.has(radio)) {
                hiddenOptions.delete(radio);
                globalHiddenOptions.delete(optionKey);
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

    function recheckAllInstances() {
        instances.forEach(instance => {
            const selectedControllingRadio = document.querySelector(
                `input[name="${instance.fieldName}"]:checked`
            );
            if (selectedControllingRadio) {
                instance.toggleRadioOptions(selectedControllingRadio.value);
            }
        });
    }

    waitForField();
}

export { toggleRadioExclude };