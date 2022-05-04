/**
 * Set up the welcome page and add some listeners.
 */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("start-help").addEventListener("click", function (e) {
        const help = document.getElementById("start-help-text")
        if (help.style.visibility === "visible") {
            help.style.visibility = "hidden";
            help.style.display = "none";
        } else {
            help.style.visibility = "visible";
            help.style.display = "inline-block";
        }
    });

    document.getElementById("correct_slides").addEventListener("click", function (e) {
        document.getElementById("step3").style.opacity = '100%';
    });

    document.getElementById("start-present").addEventListener("click", function (e) {
        window.location.href = "customize.html";
    });

    fetch("/assets/thumbnail.jpeg").then(function(response) {
        if (response.status === 200) {
            grabThumbnails().then(() => {
                console.log("setup_confirmatio");
                setup_confirmation();
            });
        }
    }); 
}, false);

/**
 * Set up the slide deck confirmation to show all the asset thumbnails
 */
function setup_confirmation() {
    const thumbnails = document.getElementById("thumbnails");
    setTimeout(() => {
        THUMBNAIL_IDS.forEach(slideID => {
            const i = document.createElement("img");
            i.src = `/assets/${slideID}/thumbnail.jpeg`;
            i.style.padding = "20px";
            thumbnails.appendChild(i);
        });
    }, 100);
    

    document.getElementById("step2").style.opacity = "100%";
}