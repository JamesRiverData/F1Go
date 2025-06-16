function hideElement(array) {
    console.log('Checking and hiding elements with names:', array);

    const interval = setInterval(() => {
        let allHidden = true;

        for (let i = 0; i < array.length; i++) {
            const textInput1 = document.querySelector(`input[name="${array[i]}"]`);
            if (textInput1) {
                const formGroup = textInput1.closest('.form-group');
                if (formGroup && formGroup.style.display !== "none") {
                    formGroup.style.display = "none";
                    console.log(`Hid element with name: ${array[i]}`);
                }
            } else {
                allHidden = false;
            }
        }

        // Stop checking once all elements are hidden
        if (allHidden) {
            console.log("All elements are hidden.");
        }
    }, 50);
}

export { hideElement };
