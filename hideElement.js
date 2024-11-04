function hideElement(array) {
    console.log('Hiding elements with names:', array); // Added log here
    for (let i = 0; i < array.length; i++) {
        const textInput1 = document.querySelector(`input[name="${array[i]}"]`);
        if (textInput1) {
            const formGroup = textInput1.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = "none";
                console.log(`Hid element with name: ${array[i]}`); // Added log here
            }
        } else {
            console.log(`Element with name ${array[i]} not found.`); // Added log here
        }
    }
}



export { hideElement };