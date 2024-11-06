function modifyRemainingText() {
    // Select all spans with the class 'optionname' within divs with class 'radio'
    let optionSpans = document.querySelectorAll('.radio');

    optionSpans.forEach(span => {
        // Check if the text includes 'remaining'
        if (span.textContent.includes('remaining')) {
            // Remove the ' - [number] remaining' part from the text
            span.textContent = span.textContent.replace(/ - \d+ remaining/, '');
            console.log('Modified text:', span.textContent);
        }
    });
}

function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                modifyRemainingText(); // Modify text when changes are detected
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
}
function radioMoneyButtonCaps(){
    observeDOMChanges(); // Start observing the DOM for changes
    modifyRemainingText(); // Modify text initially
}






export { radioMoneyButtonCaps };