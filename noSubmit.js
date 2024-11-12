function noSubmit() {
    // Get the submit button element
    const submitButton = document.querySelector(".btn.btn-lg.mb-lg.btn-primary.submit[data-qa='fb-client-button-submit']");

    // Check if the element exists
    if (!submitButton) {
        console.error("Button with the specified attributes not found.");
        return;
    }

    // Apply CSS to enable smooth movement
    submitButton.style.display = "none";
}

// Call the function
export { noSubmit }; 
