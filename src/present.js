let fullscreenObserver = new MutationObserver(() => {});
// window.addEventListener('load', function () {
//     // call fullscreen after some time to get the ball rolling.
//     setTimeout(function () {
//         fullscreen();
//         canvasListener();
//     }, 300);
// });

/** 
 * Automate the process of going fullscreen.
 */
function fullscreen() {
    let stage = document.getElementById('stageArea');
    stage.style.top = "0";
    stage.style.left = "0";
    stage.style.width = "100%";
    stage.style.height = "100%";
    stage.style.aspectRatio = "1/1";

    Array.from(stage.getElementsByTagName('div'))
                .forEach(e => {
                    e.style.width = "100%";
                    e.style.height = "100%";
                    e.style.aspectRatio = "1/1";
                });
    
    Array.from(stage.getElementsByTagName('canvas'))
                .forEach(e => {
                    e.style.width = "100%";
                    e.style.height = "100%";
                    e.style.aspectRatio = "1/1";
                });
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