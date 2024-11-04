

function hideHeader() {
    const imgElement = document.querySelector('.form-header.no-portal img'); // Select the image element directly

    if (imgElement) {
        try {
            const isEmbedded = window.self !== window.top;
            const referrer = document.referrer;
            const normalDomain = 'fellowshiponego.com'; // Change this to the actual F1Go domain

            if (isEmbedded && !referrer.includes(normalDomain)) {
                imgElement.style.display = 'none';
                console.log('Image hidden because the form is embedded in a different domain.');
            } else {
                console.log('Form is either not embedded or embedded in the normal domain.');
            }
        } catch (e) {
            imgElement.style.display = 'none'; // Assume it's embedded in a different domain if there's an error
            console.log('Error occurred, hiding the image as a precaution.');
        }
    } else {
        setTimeout(hideHeaderImageIfNecessary, 100); // Retry after 100ms if the element is not found
        console.log('Image element not found, retrying...');
    }
}






export { hideHeader };