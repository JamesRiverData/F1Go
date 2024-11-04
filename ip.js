



let IP = null; // Store the IP globally so it can be accessed later
    
async function fetchIP() {
    try {
        let response = await fetch('https://api.ipify.org?format=json');
        let data = await response.json();
        IP = data.ip; // Set the global IP variable
    } catch (error) {
        IP = null; // Set IP to null if there's an error
    }
}

function ip(num) {
    fetchIP();
    const textBox = document.querySelector(`input[name="${num}"]`);
    if (textBox) {
        textBox.style.display = "none"; // Hide the input field

        // Find and hide the closest label to the text input
        const label = textBox.closest('.form-group').querySelector('label');
        if (label) {
            label.style.display = "none"; // Hide the label
        }

        // Set up the button click listener
        document.querySelector('button[data-qa="fb-client-button-submit"]').addEventListener('click', function () {
            if (textBox && IP) {
                textBox.value = IP; // Set the input value to the fetched IP on submit
            } 
        });
    }
}


export { ip };