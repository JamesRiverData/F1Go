function waitForElement(selector, callback) {
    console.log('Looking for element:', selector);
    if (document.querySelector(selector)) {
        console.log('Element found:', selector);
        callback();
    } else {
        console.log('Element not found, retrying...'); // Added log here
        setTimeout(function () {
            waitForElement(selector, callback);
        }, 100); // Check again after 100ms
    }
}

export { waitForElement };
























