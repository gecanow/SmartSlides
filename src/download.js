/**
 * ---------------- Start
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
        window.location.href = "prez-index.html";
    });

    fetch("/assets/thumbnail.jpeg").then(function(response) {
        if (response.status === 200) {
            setup_confirmation();
        }
    }); 
}, false);


function setup_confirmation() {
    const thumbnails = document.getElementById("thumbnails");

    fetch("/assets/header.json").then(function(response) {
        response.json().then(obj => {
            obj.slideList.forEach(slideID => {
                const i = document.createElement("img");
                i.src = `/assets/${slideID}/thumbnail.jpeg`;
                i.style.padding = "20px";
                thumbnails.appendChild(i);
            });
        })
    });
    document.getElementById("step2").style.opacity = "100%";
}