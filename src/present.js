let fullscreenObserver = new MutationObserver(() => {});
/** 
 * Automate the process of going fullscreen.
 */
function fullscreen(toHide) {
    let stage = document.getElementById('stageArea');
    stage.style.marginTop = "-30px";
    stage.style.transform = "scaleX(1.6) scaleY(1.6)";

    toHide.forEach(h => {
        document.getElementById(h).style.visibility = 'hidden';
    });
    // document.body.style.backgroundColor = "black";
}

function unfullscreen(toShow) {
    let stage = document.getElementById('stageArea');
    stage.style.marginTop = "0px";
    stage.style.transform = "scaleX(1) scaleY(1)";

    toShow.forEach(h => {
        document.getElementById(h).style.visibility = 'visible';
    });
    // document.body.style.backgroundColor = "white";
}

/**
 * Observe when the canvas changes to trigger fullscreens.
 */
function canvasListener() {
    // https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
    // var targetNode = document.getElementsByTagName('canvas')[0];
    var targetNode = document.getElementById('stageArea');
    var config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    let callback = function(mutationsList) {
        // console.log(mutationsList);
        console.log(`on slide: ${gShowController.currentSlideIndex}`)
        fullscreen();
    };

    // Create an observer instance linked to the callback function
    fullscreenObserver.disconnect();
    fullscreenObserver = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    fullscreenObserver.observe(targetNode, config);
}