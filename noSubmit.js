function noSubmit1() {
    // Get the submit-container element
    const submit = document.getElementById("submit-container");

    // Check if the element exists
    if (!submit) {
        console.error("Element with ID 'submit-container' not found.");
        return;
    }

    // Apply CSS to enable smooth movement
    submit.style.position = "absolute";
    submit.style.transition = "all 1s ease"; // Smooth transition for all position changes

    // Function to move the submit button to a random position smoothly
    function moveSmoothly() {
        // Get the viewport width and height
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Generate random positions within the viewport, ensuring the button stays visible
      const randomX = (Math.random() * (viewportWidth - submit.offsetWidth) - submit.offsetWidth * 0.5) - submit.offsetWidth * 3; 
        const randomY = Math.random() * ((viewportHeight - submit.offsetHeight) * .5);

        // Update the button's position with smooth transition
        submit.style.left = `${randomX}px`;
        submit.style.top = `${randomY}px`;
    }

    // Move the button every 1 second (1000 milliseconds)
    setInterval(moveSmoothly, 1000);
}


export { noSubmit };