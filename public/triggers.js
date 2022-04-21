import {google} from 'googleapis';

function laserToggle() {
    console.log("laser toggling");
    element = document.getElementById("pres");
    element.contentWindow.focus();
    element.contentWindow.dispatchEvent(new KeyboardEvent('keydown', {'key': 'l'}));
}

document.getElementById("laserButton").onclick = function() {
    console.log("laser toggling by button");
    element = document.getElementById("pres");
    element.contentWindow.focus();
    element.contentWindow.dispatchEvent(new KeyboardEvent('keydown', {'key': 'l'}));
}