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
    jumboDiv.style.justifyContent = "center";
    jumboDiv.style.alignContent = "center";
    jumboDiv.style.backgroundColor = "black";
    jumboDiv.style.padding = "5px";
    jumboDiv.innerHTML = `
        <input id="slideX"></input>
        <p style="line-height: 100%; color: white;">('r'=prev, 't'=next, 'y'=jump slide, 'u'=jump scene)</p>
    `;
    document.body.insertBefore(jumboDiv, document.body.firstChild);

    // restyle the stagingArea
    const stage = document.getElementById("stageArea");
    stage.style.display = 'none';
    stage.style.marginTop = "100px";
    stage.style.display = 'block';
    stage.style.width = "100%";

    // finally, connect the script!
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

    console.log("...done...");
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

/**
 * ---------------- Start
 */
 document.addEventListener('DOMContentLoaded', function() {
    setup(gShowController);
}, false);