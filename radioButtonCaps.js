function modifyRemainingText() {
    // Select all spans with the class 'optionname' within divs with class 'radio'
    let optionSpans = document.querySelectorAll('.radio .optionname');

    optionSpans.forEach(span => {
        // Continuously remove the " - [number] remaining" part from the text if it exists
        span.textContent = span.textContent.replace(/ - \d+ remaining/, '');
    });
}

function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                modifyRemainingText(); // Modify text immediately when any changes are detected
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
}

function radioButtonCaps() {
    observeDOMChanges(); // Start observing the DOM for changes
    modifyRemainingText(); // Modify text initially
}






export { radioButtonCaps };