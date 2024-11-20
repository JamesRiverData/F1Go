function hidePastCheckboxes(chkarray) {
// Get all checkboxes with a specific name pattern
const checkboxes = document.querySelectorAll(`input[name^="${chkarray}"]`);

if (checkboxes.length > 0) {
    // Get the current date/time
    const now = new Date();
    console.log("Current Date/Time:", now);

    // Iterate over each checkbox
    checkboxes.forEach(checkbox => {
        // Get the 'name' attribute value
        const name = checkbox.getAttribute('name');
        if (name) {
            // Extract the date/time string from the 'name'
            const dateTimeString = name.split('_')[1];
            console.log("Extracted Date/Time String:", dateTimeString);

            if (dateTimeString) {
                const checkboxDateTime = new Date(dateTimeString);

                // Check if the Date/Time is older than the current Date/Time
                if (checkboxDateTime < now) {
                    // Hide the checkbox
                    checkbox.closest('label').classList.add('hidden');
                    console.log(`Hiding checkbox with name: ${name}`);
                }
            } else {
                console.warn(`Could not extract a date/time from name: ${name}`);
            }
        } else {
            console.error("Checkbox name not found.");
        }
    });
} else {
    console.error("No checkboxes found with the specified name pattern.");
}

}


export { hidePastCheckboxes };