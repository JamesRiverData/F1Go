function yesSubmit() {
    // Show and enable the submit button
    const submitButton = document.querySelector(".btn.btn-lg.mb-lg.btn-primary.submit[data-qa='fb-client-button-submit']");
    if (submitButton) {
        submitButton.style.visibility = "visible";
        submitButton.disabled = false;
    }

    // Remove the preventions to allow normal submission
    textInput1.removeEventListener("keydown", preventSubmitOnEnter);
    form.removeEventListener("submit", preventSubmit);
}

// Call the appropriate function based on the input value change
textInput1.addEventListener("change", function() {
    if (textInput1.value === "john") {
        noSubmit();
    } else {
        yesSubmit();
    }
});


// Call the function
export { noSubmit }; 
