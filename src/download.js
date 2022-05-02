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
    e.dataTransfer.dropEffect = 'copy';

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

/**
 * Unpacking the data transfer
 */

 function appendStyleToHead(fullPath) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = fullPath;
    document.head.appendChild(link);
    contentLoaded++;
    if (contentLoaded >= 5) beginPresentation();
}

function appendScriptToHTML(fullPath) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = fullPath;
    document.body.appendChild(script);
    contentLoaded++;
    if (contentLoaded >= 5) beginPresentation();
}

function unpackPDFJS(pdfjs) {
    pdfjs.createReader().readEntries(function(results) {
        results.forEach(entry => {
            if (entry.isDirectory && entry.name === "web") {
                entry.createReader().readEntries(function(es) {
                    es.forEach(e => {
                        if (!e.isDirectory && e.name === "compatibility.js") {
                            console.log("compatibility", e);
                            appendScriptToHTML(e.fullPath);
                        }
                    });
                });
            } 
            else if (!entry.isDirectory && entry.name === "bcmaps.js") {
                console.log("bcmaps", entry);
                appendScriptToHTML(entry.fullPath);
            }
            else if (!entry.isDirectory && entry.name === "pdf.js") {
                console.log("pdf", entry);
                appendScriptToHTML(entry.fullPath);
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
                appendStyleToHead(entry.fullPath);
            }
            else if (!entry.isDirectory && entry.name === "main.js") {
                console.log("main", entry);
                console.log("main-URL", (new FileReader()).readAsDataURL(entry));
                appendScriptToHTML(entry.fullPath);
                // entry.copyTo(".");
            }
        });
    });
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

        // window.requestFileSystem(Window.TEMPORARY, (res) => {
        //     console.log("res", res);
        // })
        return true;
    }

    let dirReader = dir.createReader();
    dirReader.readEntries(function(results) {
        results.forEach(entry => {
            unpackAssets(entry);
        });
    });
}

async function handleDataTransfer(dt) {
    if (!dt.items.length) return;

    const fsHandle = await dt.items[0].getAsFileSystemHandle();
    console.log(fsHandle);

    // filter for only the ASSETS folder
    const allTopFolders = [...Array(dt.items.length).keys()]
                                .map(i => dt.items[i].webkitGetAsEntry())
                                .filter(i => i.isDirectory);
    
    allTopFolders.forEach(f => {
        unpackAssets(f);
        // console.log(f);
        // f.copyTo(".");
    });
}

function saveFiles(f) {
    Window.requestFileSystem(Window.TEMPORARY, )
}

/**
 * ---------------- Start
 */
contentLoaded = 0;
document.addEventListener('DOMContentLoaded', function() {
    dragNdrop();

}, false);

function beginPresentation() {
    document.getElementById("dropbox").style.display = "none";
    document.getElementById("presentation").style.display = "block";
}