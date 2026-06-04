/**
 * populateFieldAfterDateTime.js
 *
 * Populates a Ministry Brands form field with text only after a specified date/time
 *
 * Usage in your form:
 * populateFieldAfterDateTime('c7f3b340-efab-48fe-a2c4-4d09a86e9db3', 'Your text here', '2026-06-12 17:00');
 *
 * @param {string} fieldId - The Ministry Brands form field ID
 * @param {string} textValue - The text to populate into the field
 * @param {string} dateTime - The date/time after which to populate (Local Time)
 *                            Format: "2026-06-12 17:00" or "2026-06-12T17:00"
 */
function populateFieldAfterDateTime(fieldId, textValue, dateTime) {
    console.log(`[populateFieldAfterDateTime] Starting for field: ${fieldId}`);

    // Parse the dateTime parameter
    let targetDateTime;

    if (typeof dateTime === 'string') {
        // Parse string format: "2026-06-12 17:00" or "2026-06-12T17:00"
        targetDateTime = new Date(dateTime.replace(' ', 'T'));
    } else if (dateTime instanceof Date) {
        targetDateTime = dateTime;
    } else {
        console.error('[populateFieldAfterDateTime] Invalid dateTime format:', dateTime);
        return;
    }

    // Validate the parsed date
    if (isNaN(targetDateTime.getTime())) {
        console.error('[populateFieldAfterDateTime] Could not parse dateTime:', dateTime);
        return;
    }

    console.log(`[populateFieldAfterDateTime] Target time: ${targetDateTime.toLocaleString()}`);

    // Function to check and populate the field
    function checkAndPopulate() {
        const currentDateTime = new Date();

        // Check if current time is after the target time
        if (currentDateTime >= targetDateTime) {
            // Find the form field by looking for the input with the matching ID
            // Ministry Brands creates inputs with specific naming conventions
            const field = document.querySelector(`input[id="${fieldId}"]`) ||
                         document.querySelector(`textarea[id="${fieldId}"]`) ||
                         document.querySelector(`input[name="${fieldId}"]`) ||
                         document.querySelector(`textarea[name="${fieldId}"]`);

            if (field) {
                field.value = textValue;
                // Trigger change event to notify form of the update
                field.dispatchEvent(new Event('change', { bubbles: true }));
                field.dispatchEvent(new Event('input', { bubbles: true }));

                console.log(`[populateFieldAfterDateTime] ✓ Field populated at ${currentDateTime.toLocaleString()}`);
                console.log(`[populateFieldAfterDateTime] Value: "${textValue}"`);
                return true; // Successfully populated
            } else {
                console.warn(`[populateFieldAfterDateTime] Field not found with ID: ${fieldId}`);
                console.warn(`[populateFieldAfterDateTime] Searched for id="${fieldId}" or name="${fieldId}"`);
                return false;
            }
        }

        return false; // Not yet time to populate
    }

    // Check immediately in case we're already past the target time
    if (checkAndPopulate()) {
        return;
    }

    // Calculate milliseconds until target time
    const now = new Date();
    const delayMs = targetDateTime.getTime() - now.getTime();

    if (delayMs > 0) {
        console.log(`[populateFieldAfterDateTime] Scheduled to populate in ${Math.round(delayMs / 1000)} seconds`);

        // Set a timeout to check at the target time
        setTimeout(function() {
            console.log(`[populateFieldAfterDateTime] Timeout triggered, checking if time to populate...`);
            checkAndPopulate();
        }, delayMs);

        // Also set an interval to check every 5 seconds as a backup
        // This ensures population even if there are timing issues
        const checkInterval = setInterval(function() {
            if (checkAndPopulate()) {
                clearInterval(checkInterval);
            }
        }, 5000); // Check every 5 seconds

        console.log(`[populateFieldAfterDateTime] Backup check interval started (every 5 seconds)`);
    } else {
        console.log(`[populateFieldAfterDateTime] Target time is in the past - checking if field should be populated now`);
        checkAndPopulate();
    }
}

// Export for module usage
export { populateFieldAfterDateTime };

