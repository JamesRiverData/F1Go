let processedDropdowns = [];

function modifyText(text) {
    return text.replace(/ - \d+ remaining/, '');
}

function handleOptionClick(event) {
    const clickedOption = event.target;
    if (clickedOption.classList.contains('ss__option')) {
        console.log('Option clicked:', clickedOption.textContent);
        clickedOption.textContent = modifyText(clickedOption.textContent);
    }
}

function updateSelectedValue(dropdown) {
    const selectedValue = dropdown.querySelector('.ss__value-container');
    if (selectedValue) {
        const span = selectedValue.querySelector('span') || selectedValue.querySelector('div');
        if (span && span.textContent.includes('remaining')) {
            span.textContent = modifyText(span.textContent);
            console.log('Updated selected value:', span.textContent);
        }
    }
}

function observeDropdownChanges(dropdown) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                console.log('Mutation detected in dropdown:', dropdown);
                dropdown.querySelectorAll('.ss__option').forEach(option => {
                    if (option.textContent.includes('remaining')) {
                        option.textContent = modifyText(option.textContent);
                    }
                });
                updateSelectedValue(dropdown);
            }
        });
    });

    observer.observe(dropdown, { childList: true, subtree: true });
}

function interceptOptionClicks(dropdown) {
    dropdown.addEventListener('click', function (event) {
        handleOptionClick(event);
        setTimeout(() => updateSelectedValue(dropdown), 100);
    });
}

function setupDropdown(dropdown) {
    if (!processedDropdowns.includes(dropdown)) {
        console.log('Setting up dropdown:', dropdown);
        observeDropdownChanges(dropdown);
        interceptOptionClicks(dropdown);
        updateSelectedValue(dropdown);
        processedDropdowns.push(dropdown);
    }
}

function initializeDropdowns() {
    const elements = document.querySelectorAll('div[data-qa="field-dropdown-view-select"]'); // Adjust selector as needed
    console.log('Form elements found, initializing dropdowns...');
    elements.forEach(dropdown => setupDropdown(dropdown));
}

function dropDownCaps() {
    initializeDropdowns();
    setTimeout(dropDownCaps, 100); // Continue monitoring for new dropdowns
}


export { dropDownCaps };