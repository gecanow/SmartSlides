/**
 * Setup the DOM once the other content has loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    setup();

    document.getElementById("reset-slides").addEventListener("click", function (e) {
        window.location.href = "index.html";
    });
    document.getElementById("full-present").addEventListener("click", function (e) {
        window.location.href = "present.html";
    });
}, false);

/**
 * Main setup.
 */
function setup() {
    console.log("...setting up...");

    // restyle the stagingArea
    const stage = document.getElementById("stageArea");
    stage.style.display = 'none';
    stage.style.marginTop = "200px";
    stage.style.display = 'inline-block';
    stage.style.width = "100%";

    console.log("...done...");
}