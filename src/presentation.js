window.addEventListener('load', function () {
    // https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
    // Select the node that will be observed for mutations
    var targetNode = document.getElementById('stageArea');

    // Options for the observer (which mutations to observe)
    var config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList) {
        fullscreen();
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();

    // ALSO - from gaby - call fullscreen after some time to get the ball rolling.
    setTimeout(function () {
        fullscreen();
    }, 300);
});

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