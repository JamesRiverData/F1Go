function modifyLabelText() {
    try {
        let optionSpans = document.querySelectorAll('.label .field-label');

        optionSpans.forEach(span => {
            if (span.textContent.includes('%')) {
                span.textContent = span.textContent.replace(/ %+ /, '');
            }
        });
    } catch (error) {
        console.error("Error in modifyRemainingText:", error);
    }
}

function observeDOMChangesWithPolling() {
    setInterval(() => {
        try {
            modifyLabelText(); // Re-run text modification on a loop
            addLabelListener(); // Ensure event listeners are added
        } catch (error) {
            console.error("Error in observeDOMChangesWithPolling:", error);
        }
    }, 500); // Runs every half a second
}

function addLabelListener() {
    try {
        let labels = document.querySelectorAll('.label input[type="label"]');

        labels.forEach(label => {
            if (!label.dataset.listenerAdded) { // Prevent duplicate listeners
                label.addEventListener("change", modifyLabelText);
                label.dataset.listenerAdded = "true"; // Mark as added
            }
        });
    } catch (error) {
        console.error("Error in addRadioButtonListeners:", error);
    }
}

function labelReplacing() {
    console.log("labelreplace is running...");
    modifyLabelText(); // Modify text initially
    observeDOMChangesWithPolling(); // Start polling
    addLabelListener(); // Add event listeners for radio buttons
}



export { labelReplacing };