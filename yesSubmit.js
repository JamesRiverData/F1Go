function yesSubmit() {
    // Show and enable the submit button
    const submitButton = document.querySelector(".btn.btn-lg.mb-lg.btn-primary.submit[data-qa='fb-client-button-submit']");
    if (submitButton) {
        submitButton.style.visibility = "visible";
        submitButton.disabled = false;
    }

    // Remove the preventions to allow normal submission
    form.removeEventListener("submit", preventSubmit);
}

// Call the appropriate function based on the input value change



// Call the function
export { yesSubmit }; 
