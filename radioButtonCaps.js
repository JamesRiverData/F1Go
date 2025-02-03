function modifyRemainingText() {
    try {
        let optionSpans = document.querySelectorAll('.radio .optionname');

        optionSpans.forEach(span => {
            if (span.textContent.includes(' - ')) {
                span.textContent = span.textContent.replace(/ - \d+ remaining/, '');
            }
        });
    } catch (error) {
        console.error("Error in modifyRemainingText:", error);
    }
}

function observeDOMChangesWithPolling() {
    setInterval(() => {
        try {
            modifyRemainingText(); // Re-run text modification on a loop
            addRadioButtonListeners(); // Ensure event listeners are added
        } catch (error) {
            console.error("Error in observeDOMChangesWithPolling:", error);
        }
    }, 500); // Runs every half a second
}

function addRadioButtonListeners() {
    try {
        let radioButtons = document.querySelectorAll('.radio input[type="radio"]');

        radioButtons.forEach(radio => {
            if (!radio.dataset.listenerAdded) { // Prevent duplicate listeners
                radio.addEventListener("change", modifyRemainingText);
                radio.dataset.listenerAdded = "true"; // Mark as added
            }
        });
    } catch (error) {
        console.error("Error in addRadioButtonListeners:", error);
    }
}

function radioButtonCaps() {
    console.log("radiobuttoncaps2 is running...");
    modifyRemainingText(); // Modify text initially
    observeDOMChangesWithPolling(); // Start polling
    addRadioButtonListeners(); // Add event listeners for radio buttons
}



export { radioButtonCaps };