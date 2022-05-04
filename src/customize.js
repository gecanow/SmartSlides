const COMMAND_HEIGHT = 300;
const COMMAND_MODAL_ID = "command-modal";
const ADD_SAY_BUTTON_ID = "SAY-BUTTON";
const ADD_GESTURE_BUTTON_ID = "GESTURE-BUTTON";
const SAVE_COMMAND_ID = "save-change";
const CUSTOM_COMMAND_ID = 'iscommand-'
const COMMAND_TYPE = function (str) { return str.toString().split('-')[2]; };

// {slideIds: string[], voiceCommands: <string, string>[], gestureCommands: <string, string>[]}
const LIST_OF_COMMANDS = new Map();

/**
 * Setup the DOM once the other content has loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    grabThumbnails().then(() => {
        console.log(THUMBNAIL_IDS);
        setup();
    });

    document.body.insertAdjacentHTML('beforeend', customize_body);

    document.getElementById("reset-slides").addEventListener("click", function (e) {
        window.location.href = "index.html";
    });
    document.getElementById("full-present").addEventListener("click", function (e) {
        console.log(LIST_OF_COMMANDS);
        // add the body html
        document.getElementById('customize-body').innerHTML = ui_body;
        // and the approproate UI scripts
        ui_srcs.forEach(url => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            document.head.appendChild(script);
        });
        // run the presentation scripts
        ui_script();
        // make the presentation visible
        document.getElementById('stage-container').style.visibility = 'visible';
        document.getElementById('stage-container').style.display = 'block';
    });

}, false);

/**
 * Main setup.
 */
function setup() {
    console.log("...setting up...");

    let commands = customCommandCreationButton();
    document.getElementById('custom-command-container').appendChild(commands.html);
    commands.callbacks.forEach(f => f());

    addCommandPopupHTML();

    console.log("...done...");
}

function customCommandCreationButton() {
    const wrapperDiv = document.createElement('div');

    // Button to trigger modal popup
    const plusButton = document.createElement('button');
    plusButton.style.width = "50px";
    plusButton.style.height = "50px";
    plusButton.style.background = "transparent";
    plusButton.style.border = "0px";
    plusButton.style.padding = "0px";
    plusButton.style.lineHeight = "normal";
    plusButton.id = "main-plus-button";
    plusButton.title = "Create a new custom slides command"

    plusButton.classList.add("btn", "button-primary");
    plusButton.setAttribute("data-bs-toggle", "modal");
    plusButton.setAttribute("data-bs-target", `#${COMMAND_MODAL_ID}-${dynamicPopupID}`);

    const plusIcon = document.createElement("img");
    plusIcon.src = "/nm/bootstrap-icons/icons/plus-square-fill.svg";
    plusIcon.style.width = "50px";
    plusIcon.style.height = "50px";
    // plusIcon.style.marginTop = "-5px";
    plusIcon.style.margin = "0px";
    plusIcon.style.lineHeight = "normal";
    plusButton.appendChild(plusIcon);

    wrapperDiv.append(plusButton);

    return {html: wrapperDiv, callbacks: []};
}

/**
 * Creates HTML for a checkbox of thumbnail images.
 */
function imageCheckboxHTML(popupId) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.overflow = "auto";
    wrapperDiv.style.height = `200px`;
    wrapperDiv.style.backgroundColor = "lemonchiffon";

    const ul = document.createElement('ul');
    ul.style.width = "100%";
    ul.style.height = "100%";
    ul.style.margin = "0px";
    ul.style.padding = "0px";
    ul.style.display = "flex";
    ul.style.flexFlow = "row wrap";
    ul.style.justifyContent = "flex-start";

    THUMBNAIL_IDS.forEach(slideID => {
        const li = document.createElement('li');
        li.style.width = "30%";
        li.style.paddingTop = "5px";
        li.style.paddingLeft = "5px";

        const input = document.createElement('input');
        input.type = "checkbox";
        input.id = `cb${popupId}+${slideID}`;
        li.appendChild(input);

        const label = document.createElement('label');
        label.htmlFor = `cb${popupId}+${slideID}`;

        const i = document.createElement("img");
        i.src = `/assets/${slideID}/thumbnail.jpeg`;

        // should it already be checked?
        if (LIST_OF_COMMANDS.has(popupId)) {
            if (LIST_OF_COMMANDS.get(popupId).slideIds.has(slideID)) {
                label.checked = true;
            }
        }

        label.appendChild(i);
        li.appendChild(label);
        ul.appendChild(li);
    });

    wrapperDiv.appendChild(ul);
    return {html: wrapperDiv, callbacks: []};
}

/**
 * Creates HTML for a checkbox of commands.
 */
function commandCheckboxHTML(popupId) {
    // A SAY COMMAND
    const sayButton = document.createElement('button');
    sayButton.style.background = "transparent";
    sayButton.style.border = "0px";
    sayButton.style.padding = "5px";
    sayButton.style.lineHeight = "normal";
    sayButton.id = `${ADD_SAY_BUTTON_ID}-${popupId}`;
    sayButton.innerHTML = "<p style='color:blue;'>speech</p>"

    // A GESTURE COMMAND
    const gestureButton = document.createElement('button');
    gestureButton.style.background = "transparent";
    gestureButton.style.border = "0px";
    gestureButton.style.padding = "5px";
    gestureButton.style.lineHeight = "normal";
    gestureButton.id = `${ADD_GESTURE_BUTTON_ID}-${popupId}`;
    gestureButton.innerHTML = "<p style='color:blue;'>gesture</p>"

    // BUILD FORM
    const wrapper = `
    <div style="overflow: auto; width: 100%; display: flex;">
        <p style="line-height: 30px;">Add a</p>
        ${sayButton.outerHTML}
        <p style="line-height: 30px;"> / </p>
        ${gestureButton.outerHTML}
        <p style="line-height: 30px;">command.</p>
    </div>
    `
    const div = document.createElement("div");
    div.id = `add-command-id-${popupId}`;
    div.style.backgroundColor = "lemonchiffon";
    div.innerHTML = wrapper;

    // SPECIFY CALLBACKS
    const cb = function() {
        document.getElementById(`${ADD_SAY_BUTTON_ID}-${popupId}`).addEventListener('click', (e) => {
            const resp = sayCommand(popupId);
            document.getElementById(`add-command-id-${popupId}`).appendChild(resp.html);
            resp.callbacks.forEach(f => f());

            document.getElementById(`speech-command-${popupId}`).addEventListener('keypress', e => {
                const curr = document.getElementById(`speech-command-${popupId}`).value;
                // console.log(e, curr);
                document.getElementById(`speech-command-${popupId}`).value = curr;
                // if (e.charCode === 8) {
                //     document.getElementById(`speech-command-${popupId}`).value = curr.slice(0, -1);
                // } else {
                //     document.getElementById(`speech-command-${popupId}`).value = curr + e.key;
                // }
            });
        });

        document.getElementById(`${ADD_GESTURE_BUTTON_ID}-${popupId}`).addEventListener('click', (e) => {
            const resp = gestureCommand(popupId);
            document.getElementById(`add-command-id-${popupId}`).appendChild(resp.html);
            resp.callbacks.forEach(f => f());
        });
    }
    return {html: div, callbacks: [cb]};
}

function sayCommand(popupId) {
    return commandTemplate(
        popupId,
        "say", 
        `<input id="speech-command-${popupId}" style="height: 80%; width: 40%;"></input>`, 
        systemActionOptions(popupId),
        "peachpuff"
    );
}

function gestureCommand(popupId) {
    return commandTemplate(
        popupId,
        "do",
        gestureOptions(popupId), 
        systemActionOptions(popupId), 
        "rosybrown"
    );
}

let numCommands = 0;
function commandTemplate(popupId, type, cause, action, bgcolor) {
    const idNum = numCommands++;
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.justifyContent = "flex-start";
    label.style.alignItems = "center";
    label.style.width = "95%";
    label.style.backgroundColor = bgcolor;
    label.style.margin = "10px";
    label.style.padding = "4px";
    label.style.borderRadius = "4px";
    label.style.lineHeight = "normal";
    label.id = `${CUSTOM_COMMAND_ID}${popupId}-${type}-${idNum}`;

    label.innerHTML = `
    <p style="width:120px;">When I ${type}</p>
    ${cause}
    <p style="width:200px;">the system should</p>
    ${action}
    ${trashHTML(`trash-${idNum}`)}
    `;

    const cb = function () {
        document.getElementById(`trash-${idNum}`).addEventListener('click', (e) => {
            document.getElementById(`${CUSTOM_COMMAND_ID}${popupId}-${type}-${idNum}`).remove();
        });
    }
    return {html: label, callbacks: [cb]};
}

function gestureOptions(popupId) {
    return `
    <select id="gesture-options-${popupId}" style="width: 40%;">
        <option value="right-hand-circle">right hand circle</option>
        <option value="left-hand-circle">left hand circle</option>
        <option value="right-hand-swipe-right">right hand swipe right</option>
        <option value="left-hand-swipe-left">left hand swipe left</option>
    </select>
    `;
}

function systemActionOptions(popupId) {
    return `
    <select id="sys-action-option-${popupId}">
        <option value="next-slide">next slide</option>
        <option value="prev-slide">prev slide</option>
        <option value="small-circle">small circle</option>
        <option value="medium-circle">medium circle</option>
        <option value="large-circle">large circle</option>
    </select>
    `;
}

function trashHTML(id) {
    const trashButton = `
    <button id=${id} style="width: 15px; background-color: transparent; border: 0px; padding: 0px; line-height: normal;">
        <img src="/nm/bootstrap-icons/icons/trash3-fill.svg" style="width: 15px; height: 15px; margin: 0px; line-height: normal;">
    </button>
    `;
    return trashButton;
}

/**
 * @returns {slideIds: string[], voiceCommands: <string, string>[], gestureCommands: <string, string>[]}
 */
function compileCommands(id) {
    console.log(`Compiling commands for popup id ${id}`);

    // get the selected slides
    let slideIds = [];
    document.querySelectorAll(`[id^=cb]`).forEach(div => {
        if (div.checked) slideIds.push(div.id.split('+')[1]);
    });

    // compile the commands
    let voiceCommands = new Map();
    let gestureCommands = new Map();
    document.querySelectorAll(`[id^=${CUSTOM_COMMAND_ID}${id}]`).forEach(div => {
        let actions = div.querySelectorAll(`[id^=sys-action-option]`)[0];
        console.log(actions);
        let command = ""; let action = "";
        switch(COMMAND_TYPE(div.id)) {
            case "say":
                command = div.querySelectorAll(`[id^=speech-command]`);
                action = actions.options[actions.selectedIndex].value;
                voiceCommands.set(command[0].value, action);
                break;
            case "do":
                let commands = div.querySelectorAll(`[id^=gesture-options]`)[0];
                command = commands.options[commands.selectedIndex].value;
                action = actions.options[actions.selectedIndex].value;
                gestureCommands.set(command, action);
                break;
            default:
                console.log("should not get here!!!");
        }
    });
    return {slideIds: slideIds, voiceCommands: voiceCommands, gestureCommands: gestureCommands, popupId: id};
}

function displayCommand(commandObj) {
    const div = document.createElement("div");
    div.style.width = "60%";
    div.style.backgroundColor = "lemonchiffon";
    div.style.padding = "10px";
    div.style.marginTop = "10px";
    div.style.display = "inline-block";
    // border
    div.style.borderRadius = "5px";
    div.style.borderWidth = "1px";
    div.style.borderColor = "black";
    div.style.borderStyle = "solid";

    html = `<div style="display: flex;"><p>On these slides:</p>`;
    commandObj.slideIds.forEach(id => {
        html += `<img src=${`/assets/${id}/thumbnail.jpeg`} style="width:100px; padding: 5px;"></img>`;
    });
    html += `</div>`;

    html += `<p style='text-align: left;'>When you say...`;
    commandObj.voiceCommands.forEach((val, key) => {
        html += `<br>&emsp;- <strong>${key}</strong> the system will do <strong>${val}</strong>`;
    });
    html += "</p>"

    html += `<p style='text-align: left;'>When you do...`;
    commandObj.gestureCommands.forEach((val, key) => {
        html += `<br>&emsp;- <strong>${key}</strong> the system will do <strong>${val}</strong>`;
    });
    html += "</p>"

    html += `<button class="btn button-primary" data-bs-toggle="modal" data-bs-target="#${COMMAND_MODAL_ID}-${commandObj.popupId}">Edit</button>`

    div.innerHTML = html;
    return div;
}

let dynamicPopupID = 0;
function addCommandPopupHTML() {
    const id = dynamicPopupID++;
    const slideImgs = imageCheckboxHTML(id);
    const commandOptions = commandCheckboxHTML(id);

    // https://getbootstrap.com/docs/4.0/components/modal/
    const popup = `
    <!-- Modal -->
    <div class="modal fade" id=${COMMAND_MODAL_ID}-${id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Custom Command</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>On slides:</p>
                ${slideImgs.html.outerHTML}
                <p>Execute the following commands:</p>
                ${commandOptions.html.outerHTML}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id=${SAVE_COMMAND_ID}-${id} type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    `;

    const saveF = function() {
        document.getElementById(`${SAVE_COMMAND_ID}-${id}`).addEventListener("click", (e) => {
            const commandObj = compileCommands(id);
            document.getElementById(`custom-command-container-host-${id}`).innerHTML = displayCommand(commandObj).outerHTML;
            LIST_OF_COMMANDS.set(id, commandObj);
            addCommandPopupHTML(); // add one for next use
        });
    }

    document.getElementById('modal-custom-command').insertAdjacentHTML('beforeend', popup);
    document.getElementById('main-plus-button').setAttribute("data-bs-target", `#${COMMAND_MODAL_ID}-${id}`);
    document.getElementById('custom-command-container').insertAdjacentHTML('beforeend', `<div id="custom-command-container-host-${id}"></div>`);
    slideImgs.callbacks.concat(commandOptions.callbacks).forEach(f => f());
    saveF();
}



/**
 * TOGGLE BETWEEN PAGES:
 */
const customize_body = `
<div id="customize-body">
    <div style="text-align: center;  background-color:rosybrown; display:inline-block; justify-content: center; padding: 15px; width: 100%;">
            <h1>SmartSlides</h1>
            <h3>Customize your presentation experience.</h3>
            <p id="reset-slides" style="color:rgb(38, 110, 182); cursor: pointer;"><a>< Choose new slidedeck</a></p>
            <p id="full-present" style="color:rgb(38, 110, 182); cursor: pointer;"><a>Present ></a></p>
    </div>
    <!-- Customizes -->
    <div id="modal-custom-command" style="text-align:center; display: flex;"></div>
    <div id="custom-command-container" style="text-align:center; height: 500px; overflow: auto;"></div>
</div>
`;
const stage_ui = `
<div id="stage-container">
    <div id="stageArea" style="margin-top:100px;">
        <div id="stage" class="stage">
        </div>
        <div id="hyperlinkPlane" class="stage">
        </div>
    </div>
    <div id="slideshowNavigator">
    </div>
    <div id="slideNumberControl">
    </div>
    <div id="slideNumberDisplay">
    </div>
    <div id="helpPlacard">
    </div>
    <div id="waitingIndicator">
        <div id="waitingSpinner">
        </div>
    </div>
</div>
`;
const stage_srcs = [
    "assets/player/pdfjs/bcmaps.js",
    "assets/player/pdfjs/web/compatibility.js",
    "assets/player/pdfjs/pdf.js",
    "assets/player/main.js"
];
const ui_body = `
    <div class="jumbotron" style="display: flex; justify-content: center;">
        <div style="flex-direction:column; align-items: center;">
            <h1>SmartSlides</h1>
            <!-- <form action="#">
                    <label for="customizations">Customization Dropdown</label>
                    <select name="cusomtizations" id="customizations">
                    <option value="op1">option1</option>
                    <option value="op2">option2</option>

                    </select>
                    <input type="submit" value="Submit" />
            </form>
            <button type="button" onclick="changeStyle()">Click Me</button>  -->
        </div>
    </div>

    <div id="instructions" style="margin-top:10px; margin-left:20px;">
        <div style="display: flex; justify-content: center;">
            <h2>Press the 'h' key to toggle between help screen and slideshow.</h2>
        </div>
        <div class="row">
            <div class="col">
            <h2>Speech Commands. </h2>
            </div>
            <div class="col">
            <h2>Gesture Commands. </h2>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - next slide = "next"</p>
            </div>
            <div class="col">
            <p> - next slide = hand swipe right or up </p>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - previous slide = "previous"</p>
            </div>
            <div class="col">
            <p> - previous slide = hand swipe left or down </p>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - start laser = "laser"</p>
            <p> &emsp; - stop laser = "stop laser", "turn off laser"</p>
            </div>
            <div class="col">
            <p> - laser position = hand position from leap sensor </p>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - draw circle = "circle" </p>
            <p> &emsp; - sizes = "small," "big"</p>
            <p> &emsp; - colors = "green," "blue," "red" (default)</p>
            </div>
            <div class="col">
            <p> - hand position / cursor position is center of circle drawn </p>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - start highlight mode = "turn on highlight", "pink highlight", "orange highlight", "yellow highlight"</p>
            <p> &emsp; - when in highlight mode, can see cursor and define top left and bottom right corners for highlighted rectangle area </p>
            <p> &emsp; - top left corner of highlight = "start" </p>
            <p> &emsp; - bottom right corner of highlight = "stop" </p>
            <p> &emsp; - turn off highlight mode = "turn off highlight" </p>
            </div>
            <div class="col">
            <p> - hand position / cursor position of cursor used to control highlight when specifying the top left and bottom right corners of the rectangle </p>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - make text box = "text box"</p>
            <p> &emsp; - recognized speech will be transcribed in text box on slide
            </div>
            <div class="col">
            <p> - hand position / cursor position of cursor used is where text box will be drawn </p>
            </div>

            <div class="w-100"></div>
            <div class="col">
            <p> - undo - "undo"   </p>
            <p> &emsp; - erases the last addition (circle or highlight) added to the slide </p>
            </div>
            <div class="col">
            <p> </p>
            </div>

        </div>
    </div>
`;
const ui_srcs = [
    "app/main.js",
    "app/setupSpeech.js"
];
const ui_script = function() {
    document.getElementById("instructions").style.opacity = "0.0";
    document.onkeyup = function changeStyle() {
        var keycode = event.keyCode;

        if (keycode === 72) {
        var element = document.getElementById("instructions");
        var temp = window.getComputedStyle(element).getPropertyValue("opacity");
        if (temp == 0.0) {
            element.style.opacity = "1.0";
        } else {
            element.style.opacity = "0.0";
        }

        var element1 = document.getElementById("stage");
        var temp1 = window.getComputedStyle(element1).getPropertyValue("opacity");
        if (temp1 == 0.0) {
            element1.style.opacity = "1.0";
        } else {
            element1.style.opacity = "0.0";
        }
        }

    }
}