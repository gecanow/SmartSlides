/**
 * Hook up the control listeners once the other content has loaded.
 */
 document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'r') {
            siteControl_prev();
        }
        else if (e.key === 't') {
            siteControl_next();
        }
        else if (e.key === 'y') {
            const value = parseInt(document.getElementById("slideX")?.nodeValue ?? gShowController.currentSlideIndex);
            siteControl_jumpSlide(value);
        }
        else if (e.key === 'u') {
            let value = parseInt(document.getElementById("slideX")?.nodeValue ?? gShowController.currentSlideIndex);
            siteControl_jumpScene(value);
        }

    });
}, false);

// Helper to get current slide
const currShownSlide = function() { return parseInt(gShowController.currentSlideIndex); }

// Programmatically move to the prev slide
function siteControl_prev() {
    console.log("prev");
    let event = new KeyboardEvent('keydown', {'charCode': 37 /*kKeyCode_LeftArrow*/});
    gShowController.handleKeyDownEvent(event);
}

// Programmatically move to the next slide
function siteControl_next() {
    console.log("next");
    let event = new KeyboardEvent('keydown', {'charCode': 39 /*kKeyCode_RightArrow*/});
    gShowController.handleKeyDownEvent(event);
}

// Programmatically move to slide X
function siteControl_jumpSlide(x) {
    console.log("jumpSlide");
    gShowController.jumpToSlide(x);
    // jumpToSlide(x);
}

// Programmatically move to scene X
function siteControl_jumpScene(x) {
    console.log("jumpScene");
    gShowController.jumpToScene(x);
}

// Programmatically rewinds X slides back
function siteControl_rewindSlide(x) {
    console.log(`rewindSlide ${currShownSlide() - x}`);
    siteControl_jumpSlide(gShowController, currShownSlide() - x);
}

// Programmatically rewinds X scenes back
function siteControl_rewindScene(x) {
    console.log("rewindScene");
    siteControl_jumpScene(gShowController, currShownSlide() - x);
}

// Programmatically fast-forwards X slides back
function siteControl_ffSlide(x) {
    console.log(`ffSlide ${gShowController.currentSlideIndex - x}`);
    siteControl_jumpSlide(gShowController, currShownSlide() + x);
}

// Programmatically fast-forwards  X scenes back
function siteControl_ffScene(x) {
    console.log("ffScene");
    siteControl_jumpScene(gShowController, currShownSlide() + x);
}

// Programmatically get slide index
function siteControl_currentSlideIndex() {
    return currShownSlide();
}

// Programmatically get the slide index from slide id
function siteControl_slideIndex(slideId) {
    return THUMBNAIL_IDS.indexOf(slideId);
}
