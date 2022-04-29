function setup() {
    console.log("...setting up...");

    // configure the head
    const head = document.head;
    head.title = "SmartSlides";
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    head.appendChild(link);
    
    // add the jumbotron
    const jumboDiv = document.createElement("div");
    jumboDiv.className = "jumbotron";
    jumboDiv.style.display = "flex";
    jumboDiv.style.justifyContent = "center";
    jumboDiv.innerHTML = `
        <div style="flex-direction:column; align-items: center;">
            <h1>SmartSlides</h1>
            <input id="slideX"></input>
            <button id="appleBttn">Run Apple Script</button>
        </div>
    `;
    document.body.insertBefore(jumboDiv, document.body.firstChild);

    // restyle the stagingArea
    const stage = document.getElementById("stageArea");
    if (stage) {
        stage.style.display = 'none';
        stage.style.marginTop = "100px";
        stage.style.display = 'block';
    }

    // finally, connect the script!
    document.addEventListener('keydown', function (e) {
        // console.log(e);
        // console.log(gShowController);

        if (e.key === 'r') {
            prev();
        }
        else if (e.key === 't') {
            next();
        }
        else if (e.key === 'y') {
            const value = parseInt(document.getElementById("slideX")?.nodeValue ?? gShowController.currentSlideIndex);
            jumpSlide(value);
        }
        else if (e.key === 'u') {
            let value = parseInt(document.getElementById("slideX")?.nodeValue ?? gShowController.currentSlideIndex);
            jumpScene(value);
        }
        else if (e.key === 'i') {
            convertToHTML();
        }

    });

    document.getElementById("appleBttn")?.addEventListener("onclick", function(e) {
        convertToHTML();
    });
}

// Programmatically move to the prev slide
function prev() {
    console.log("prev");
    let event = new KeyboardEvent('keydown', {'charCode': 37 /*kKeyCode_LeftArrow*/});
    gShowController.handleKeyDownEvent(event);
}

// Programmatically move to the next slide
function next() {
    console.log("next");
    let event = new KeyboardEvent('keydown', {'charCode': 39 /*kKeyCode_RightArrow*/});
    gShowController.handleKeyDownEvent(event);
}

// Programmatically move to slide X
function jumpSlide(x) {
    console.log("jumpSlide");
    gShowController.jumpToSlide(x);
}

// Programmatically move to scene X
function jumpScene(x) {
    console.log("jumpScene");
    gShowController.jumpToScene(x);
}

// Programmatically rewinds X slides back
function rewindSlide(x) {
    console.log("rewindSlide");
    jumpSlide(gShowController, gShowController.currentSlideIndex - x);
}

// Programmatically rewinds X scenes back
function rewindScene(x) {
    console.log("rewindScene");
    jumpScene(gShowController, gShowController.currentSlideIndex - x);
}

// Programmatically fast-forwards X slides back
function ffSlide(x) {
    console.log("ffSlide");
    jumpSlide(gShowController, gShowController.currentSlideIndex + x);
}

// Programmatically fast-forwards  X scenes back
function ffScene(x) {
    console.log("ffScene");
    jumpScene(gShowController, gShowController.currentSlideIndex + x);
}

async function convertToHTML() {
    // Very basic AppleScript command. Returns the song name of each
    // currently selected track in iTunes as an 'Array' of 'String's.
    const script = `
    -- https://iworkautomation.com/keynote/document-export.html
    tell application "Keynote"
        activate
        
        set tempDir to "tmp"
        
        -- destination folder
        tell application "Finder"
            set currentFolder to container of (path to me) as alias
            set the chosenDocumentFile to (choose file default location currentFolder with prompt "Choose the presentation:")
            set the targetFolderHFSPath to (currentFolder & tempDir) as string
        end tell
        
        --export doc
        set the chosenDocument to (open chosenDocumentFile)
        with timeout of 1200 seconds
            export chosenDocument as HTML to file targetFolderHFSPath
        end timeout
        close chosenDocument
        
        -- move the new assets into the public/presentation folder
        tell application "Finder"
            activate
            set assetsFolder to POSIX path of (currentFolder as string) & (tempDir as string) & ("/assets" as string)
            set destFolder to POSIX path of (currentFolder as string) & ("../../../public/presentation/assets" as string)
            move folder assetsFolder to folder destFolder
        end tell
        
        display dialog "Done"
    end tell
    `;

    // const runAppleScript = require('run-applescript');
    console.log(`attempting to run ${script}`);
    // const result = await runAppleScript(script);
    console.log(result);
}


/**
 * ---------------- Start
 */
 document.addEventListener('DOMContentLoaded', function() {
    setup(gShowController);
}, false);