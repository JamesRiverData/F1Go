function funSubmit() {
    // Get the submit button element
    const submitButton = document.querySelector(".btn.btn-lg.mb-lg.btn-primary.submit[data-qa='fb-client-button-submit']");

    // Check if the element exists
    if (!submitButton) {
        console.error("Button with the specified attributes not found.");
        return;
    }

    // Apply CSS to enable smooth movement
    submitButton.style.position = "absolute";
    submitButton.style.transition = "all .2s ease"; // Smooth transition for all position changes

    // Function to move the submit button to a random position smoothly
    function moveSmoothly() {
        // Get the viewport width and height
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Generate random positions within the allowed range
        let randomX = Math.random() * (viewportWidth - submitButton.offsetWidth);
        let randomY = Math.random() * (viewportHeight - submitButton.offsetHeight) * 0.5;

        // Clamp the X position between -55px and 575px
        randomX = Math.max(-55, Math.min(randomX, 575));

        // Update the button's position with smooth transition
        submitButton.style.left = `${randomX}px`;
        submitButton.style.top = `${randomY}px`;

        // Generate a random hex color
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 16).toString(16);
        }

        // Apply the random color to the background with !important
        submitButton.style.setProperty("background-color", color, "important");
        submitButton.style.setProperty("border-color", color, "important");

        // Additional random check for z-index
        const zIndexRandom = Math.random(); // Generate a random number between 0 and 1
        submitButton.style.zIndex = zIndexRandom <= 0.1 ? "0" : "9999"; // Set z-index to 0 or 9999 based on probability
    }
//test
    // Move the button every 250 milliseconds
    setInterval(moveSmoothly, 250);
}

// Call the function
export { funSubmit }; 
