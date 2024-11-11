function noSubmit1() {
    // Get the submit button element
    const submitButton = document.querySelector(".btn.btn-lg.mb-lg.btn-primary.submit[data-qa='fb-client-button-submit']");

    // Check if the element exists
    if (!submitButton) {
        console.error("Button with the specified attributes not found.");
        return;
    }

    // Apply CSS to enable smooth movement
    submitButton.style.position = "absolute";
    submitButton.style.transition = "all .5s ease"; // Smooth transition for all position changes

    // Function to move the submit button to a random position smoothly
    function moveSmoothly() {
        // Get the viewport width and height
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Generate random positions within the viewport
        const randomX = (Math.random() * (viewportWidth - submitButton.offsetWidth) - submitButton.offsetWidth * 0.5) - submitButton.offsetWidth * 3;
        const randomY = Math.random() * ((viewportHeight - submitButton.offsetHeight) * 0.5);

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
        submitButton.style.setProperty("boarder-color", color, "important");

        // Additional random check for z-index
        const zIndexRandom = Math.random(); // Generate a random number between 0 and 1
        if (zIndexRandom >= 0 && zIndexRandom <= 0.1) {
            submitButton.style.zIndex = "0"; // Set z-index to 0
        } else {
            submitButton.style.zIndex = "9999"; // Set z-index to 9999
        }
    }

    // Move the button every 1 second (1000 milliseconds)
    setInterval(moveSmoothly, 500);
}


    
noSubmit1();