/**
 * Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
 */


function dragNdrop() {
    let dropbox = document.getElementById("dropbox");
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragenter, false);
    dropbox.addEventListener("dragleave", dragleave, false);
    dropbox.addEventListener("drop", drop, false);
}

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();

    document.getElementById("dropbox-text").textContent = "+";
    document.getElementById("dropbox").style.backgroundColor = "lightgreen";
}

function dragleave(e) {
    document.getElementById("dropbox-text").textContent = "Drag Assets Here";
    document.getElementById("dropbox").style.backgroundColor = "lightgrey";
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
  
    const dt = e.dataTransfer;
    dragleave(e);  // 

    handleDataTransfer(dt);
}

function unpackPDFJS(pdfjs) {
    pdfjs.createReader().readEntries(function(results) {
        results.forEach(entry => {
            if (entry.isDirectory && entry.name === "web") {
                entry.createReader().readEntries(function(es) {
                    es.forEach(e => {
                        if (!e.isDirectory && e.name === "compatibility.js") {
                            console.log("compatibility", e);
                        }
                    });
                });
            } 
            else if (!entry.isDirectory && entry.name === "bcmaps.js") {
                console.log("bcmaps", entry);
            }
            else if (!entry.isDirectory && entry.name === "pdf.js") {
                console.log("pdf", entry);
            }
        });
    });
}

function unpackPlayer(player) {
    player.createReader().readEntries(function(results) {
        results.forEach(entry => {
            if (entry.isDirectory && entry.name === "pdfjs") {
                unpackPDFJS(entry);
            } 
            else if (!entry.isDirectory && entry.name === "styles.css") {
                console.log("styles", entry);
            }
            else if (!entry.isDirectory && entry.name === "main.js") {
                console.log("main", entry);
            }
        });
    });

    // let stylesheet = assets.getFile("player/styles.css");
    // let f1 = assets.getFile("/player/pdfjs/bcmaps.js");
    // let f2 = assets.getFile("/player/pdfjs/web/compatibility.js");
    // let f3 = assets.getFile("/player/pdfjs/pdf.js");
    // let f4 = assets.getFile("/player/main.js");
}

function unpackAssets(dir) {
    if (!dir.isDirectory) return false;
    if (dir.name === "assets") {
        console.log(dir);
        // unpack the assets
        dir.createReader().readEntries(function(results) {
            results.forEach(entry => {
                if (entry.isDirectory && entry.name === "player") {
                    unpackPlayer(entry);
                }
            });
        });
        return true;
    }

    let dirReader = dir.createReader();
    dirReader.readEntries(function(results) {
        results.forEach(entry => {
            unpackAssets(entry);
        });
    });
}

function handleDataTransfer(dt) {
    if (!dt.items.length) return;

    // filter for only the ASSETS folder
    const allTopFolders = [...Array(dt.items.length).keys()]
                                .map(i => dt.items[i].webkitGetAsEntry())
                                .filter(i => i.isDirectory);
    
    allTopFolders.forEach(f => {
        unpackAssets(f);
    });
}

/**
 * ---------------- Start
 */
 document.addEventListener('DOMContentLoaded', function() {
    dragNdrop();
}, false);