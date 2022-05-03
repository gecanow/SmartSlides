/**
 * Setup the control listeners once the other content has loaded.
 */
 document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function (e) {
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

    });
}, false);

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