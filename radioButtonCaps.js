function modifyRemainingText() {
    // Select all spans with the class 'optionname' within divs with class 'radio'
    let optionSpans = document.querySelectorAll('.radio .optionname');

    optionSpans.forEach(span => {
        if (span.textContent.includes(' - ')) {
            span.textContent = span.textContent.replace(/ - \d+ remaining/, '');
        }
    });
}

function observeDOMChanges() {
    const targetElement = document.querySelector('.radio-container'); // Replace with a specific container
    if (!targetElement) return;

    const observer = new MutationObserver(() => {
        modifyRemainingText();
    });

    // Start observing the target element for changes
    observer.observe(targetElement, { childList: true, subtree: true });
}

function radioButtonCaps() {
    modifyRemainingText(); // Modify text initially
    observeDOMChanges(); // Start observing the DOM for changes
}





export { radioButtonCaps };