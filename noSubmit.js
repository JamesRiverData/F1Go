function noSubmit() {
    // Get the submit button element
    const submitButton = document.querySelector(".btn.btn-lg.mb-lg.btn-primary.submit[data-qa='fb-client-button-submit']");

    // Check if the element exists
    if (!submitButton) {
        console.error("Button with the specified attributes not found.");
        return;
    }

    // Hide and disable the submit button
    submitButton.style.visibility = "hidden";
    submitButton.disabled = true;


    // Prevent form submission entirely, in case of clicks or other triggers
    form.addEventListener("submit", function(event) {
        event.preventDefault();
    });
}


// Call the function
export { noSubmit }; 
