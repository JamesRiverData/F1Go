# F1Go


function waitForElement Waits until it finds the element to run


hide element takes an array to then loop throught to hide thoes input elements and the lables around them. 



    global.radioVar = radioVar;
    takes in four variables first is the number for the raido button you want it to check, secound is an array of items you want it to check for
    like south, west, north, and joplin, third is the number for the text box and last is the array of items you want in the text box like clark chaple, KCI, etc. It will also hide the text box you give it. 



    global.waitForElement = waitForElement;
    if things are happening to eary you can use this to wait until it finds the element to do the funciton




    global.hideElement = hideElement;
    give this an array filled with the numbers of the elements you want to hide



    global.RadioButtonCaps = radioButtonCaps;
    removes caps for all radio buttons does not require a VAR


    global.DropDownCaps = dropDownCaps;
    removes caps for all drop downs no var required



    global.hideHeader = hideHeader;
    this will hide the header image if it is not in the f1go domain. no var required.


    ip
    this will take a text box number in as a string but will hide it and save their ip to it.  


    toggleRadioInlude
    Function will take a string and then array. The first string is the Field ID EXAMPLE 7c41ff26-d8ff-41a2-986d-bbbd2f05fe0c. The secound is an array of strings. The Field ID is the ID of the raido button you want to be
    the control. It will be what is  hidding options on the other radio buttons. The array of strings are the values of the options in the array. It will then contiue showing the value of option chosen and hide all other values. EXAMPLE if array had ["adult", "teen", "child"]. then it would look for these values in the first radio button. Lets say the button with value adult was chosen. Then any radio button (not the control radio buttons) with values teen or child will be hidden. 

    toggleRadioExlude
    This function will only take in a string. It will be a field ID. Example 7c41ff26-d8ff-41a2-986d-bbbd2f05fe0c. It will take the field ID and make that radio button the control. It will then hide any radio button with the same value as the option chosen in the 
    control radio button. 







    Some good starters for if you are using the java script is this 
    

copy from here------------------------------------------------------------------------------------------------------------



<script src="https://jamesriverdata.github.io/F1Go/F1Go.js" type="module" defer></script>

<script defer>
    function runInlineScript() {
        try {
            if (typeof window.radioButtonCaps === 'function') {
    
                //Write code here --------------------
    
    
    


    
    
    
                //------------------------------------
    
                console.log("Function executed successfully.");
            } else {
                throw new Error("radioButtonCaps function not loaded yet");
            }
        } catch (error) {
            console.error("Error in runInlineScript:", error.message);
            // Retry after 100ms if radioButtonCaps is not available
            setTimeout(runInlineScript, 10);
        }
    }
    
    // Run the script initially
    setTimeout(runInlineScript, 100);
    /*
ip
radioVar
waitForElement
hideElement
radioButtonCaps
dropDownCaps
hideHeader
noSubmit
funSubmit
yesSubmit
hidePastCheckboxes
toggleRadioExlude
toggleRadioInlude
         */
    </script>



TO here -----------------------------------------------------------------------------------------------------------------------

using this will make sure that it has loaded the funntions you are using and has a lot of the funcions names below









If using the CSS

copy form here ----------------------------------------------------------------------------------------------------------------



<link href="https://jamesriverdata.github.io/F1Go/F1Go.css" rel="stylesheet">
<style>
:root {
    --primary-color: #00a3e0;
    --dark-red: #990000; 
    --label-gray: #666666; 
}
</style>



to here -=----------------------------------------------------------------------------------------------------------------------

Database architecture flowchart: https://app.diagrams.net/?src=about#G1PX7yGpj2qZ7z15_gQfU1XtTgBmwpX7QV#%7B%22pageId%22%3A%22E4TvLMoSpwqoScdtEkGw%22%7D




This will make it so you can still change the varables in the code. 
