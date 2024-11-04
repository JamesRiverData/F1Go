



function radioVar(radioNum, radioArray, textNum, textArray) {
    try {
        const textInput = document.querySelector(`input[name="${textNum}"]`);
        if (!textInput) {
            console.error(`Error: No input field found with name "${textNum}"`);
            return;
        }
        const formGroup = textInput.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = "none";
            }
        
        const radios = document.querySelectorAll(`input[type="radio"][name="${radioNum}"]`);
        if (radios.length === 0) {
            console.error(`Error: No radio buttons found with name "${radioNum}"`);
            return;
        }
        
        const submitButton = document.querySelector('button[data-qa="fb-client-button-submit"]');
        if (!submitButton) {
            console.error(`Error: No submit button found with data-qa="fb-client-button-submit"`);
            return;
        }
        
        submitButton.addEventListener('click', function () {
            try {
                const selectedRadio = Array.from(radios).find(radio => radio.checked);
                
                if (selectedRadio) {
                    console.log(`Selected campus: ${selectedRadio.value}`);
                    
                    // Loop through the radioArray to find a match
                    let foundMatch = false;
                    for (let i = 0; i < radioArray.length; i++) {
                        if (radioArray[i] === selectedRadio.value) {
                            textInput.value = textArray[i];
                            foundMatch = true;
                            break;
                        }
                    }
                    
                    if (!foundMatch) {
                        console.error(`Error: No matching value found in radioArray for selected radio: ${selectedRadio.value}`);
                    }
                } else {
                    console.log('No campus selected.');
                }
            } catch (error) {
                console.error("Error during submit button click handler:", error);
            }
        });
    } catch (error) {
        console.error("Error initializing radioVar function:", error);
    }
}




export { radioVar };