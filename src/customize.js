const COMMAND_HEIGHT = 300;
const COMMAND_MODAL_ID = "command-modal";
const ADD_SAY_BUTTON_ID = "SAY-BUTTON";
const ADD_GESTURE_BUTTON_ID = "GESTURE-BUTTON";
const SAVE_COMMAND_ID = "save-change";
const CUSTOM_COMMAND_ID = 'iscommand-'
const COMMAND_TYPE = function (str) { return str.toString().split('-')[2]; };

const systemActionOptionList = ["next-slide", "prev-slide", "small-circle", "medium-circle", "large-circle"];
const gestureOptionList = ["right-hand-swipe-right", "left-hand-swipe-left"];
// {slideIds: string[], voiceCommands: <string, string>[], gestureCommands: <string, string>[], popupId: number}
const LIST_OF_COMMANDS = new Map();
let dynamicPopupID = 0;

/**
 * Setup the DOM once the other content has loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    grabThumbnails().then(() => {
        console.log(THUMBNAIL_IDS);
        setTimeout(setup, 100);
    });

    customize_script();

}, false);

/**
 * Main setup.
 */
function setup() {
    console.log("...setting up...");

    // make the + button
    let commands = customCommandCreationButton();
    document.getElementById('custom-command-container').appendChild(commands.html);
    commands.callbacks.forEach(f => f());

    // commands
    let id = dynamicPopupID++;
    LIST_OF_COMMANDS.set(0, {
        slideIds: THUMBNAIL_IDS,
        voiceCommands: new Map([
            ['next', 'next-slide'],
            ['prev', 'prev-slide'],
            ['circle', 'medium-circle'],
        ]),
        gestureCommands: new Map([
            ['right-hand-swipe-right', 'next-slide'],
            ['left-hand-swipe-left', 'prev-slide'],
        ]),
        popupId: id,
    });
    addCommandPopupHTML(id, true);  // automatically display = true

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
            console.log(`checking ${LIST_OF_COMMANDS.get(popupId).slideIds} for ${slideID}:`);
            console.log(LIST_OF_COMMANDS.get(popupId).slideIds.indexOf(slideID) >= 0);
            if (LIST_OF_COMMANDS.get(popupId).slideIds.indexOf(slideID) >= 0) {
                input.setAttribute("checked", true);
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
    function addSayCommand(key=null, value=null) {
        const resp = sayCommand(popupId, key, value);
        document.getElementById(`add-command-id-${popupId}`).appendChild(resp.html);
        resp.callbacks.forEach(f => f());
    }
    function addGestureCommand(key=null, value=null) {
        const resp = gestureCommand(popupId, key, value);
        document.getElementById(`add-command-id-${popupId}`).appendChild(resp.html);
        resp.callbacks.forEach(f => f());
    }
    const cb = function() {
        document.getElementById(`${ADD_SAY_BUTTON_ID}-${popupId}`).addEventListener('click', (e) => {
            addSayCommand();
        });

        document.getElementById(`${ADD_GESTURE_BUTTON_ID}-${popupId}`).addEventListener('click', (e) => {
            addGestureCommand();
        });

        // Add existing commands, if they exist
        if (LIST_OF_COMMANDS.has(popupId)) {
            LIST_OF_COMMANDS.get(popupId).voiceCommands.forEach((value, key) => {
                addSayCommand(key, value);
            });
            LIST_OF_COMMANDS.get(popupId).gestureCommands.forEach((value, key) => {
                addGestureCommand(key, value);
            });
        }
    }

    return {html: div, callbacks: [cb]};
}

let sayCommandCtr = new Map();
function sayCommand(popupId, key="", value=null) {
    sayCommandCtr.set(popupId, sayCommandCtr.has(popupId) ? sayCommandCtr.get(popupId)+1 : 0);
    const output = commandTemplate(
        popupId,
        "say",
        `<input id="speech-command-${popupId}-${sayCommandCtr.get(popupId)}" style="height: 80%; width: 40%;" value="${key ?? ""}"></input>`,
        systemActionOptions(popupId, value),
        "peachpuff"
    );

    return {
        html: output.html,
        callbacks:
            output.callbacks.concat(
                [function () {
                    const idToCheck = `speech-command-${popupId}-${sayCommandCtr.get(popupId)}`;
                    console.log(`keypress on ${idToCheck} ?`);
                    document.getElementById(idToCheck).addEventListener('keypress', e => {
                        const curr = document.getElementById(idToCheck).value;
                        console.log(e, curr);
                        document.getElementById(idToCheck).value = curr;
                    });
                    console.log(`keydown on ${idToCheck} ?`);
                    document.getElementById(idToCheck).addEventListener('keydown', e => {
                        const curr = document.getElementById(idToCheck).value;
                        console.log(e, curr);
                    });
                }]
            )
        };
}

function gestureCommand(popupId, key=null, value=null) {
    return commandTemplate(
        popupId,
        "do",
        gestureOptions(popupId, null),
        systemActionOptions(popupId, null),
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

function gestureOptions(popupId, selected) {
    let html = `<select id="gesture-options-${popupId}" style="width: 40%;">`;
    gestureOptionList.forEach(o => {
        // should it already be checked?
        if (selected && selected === o) {
            html += `<option value="${o}" selected=true>${o}</option>`;
        } else {
            html += `<option value="${o}">${o}</option>`;
        }
    });
    html += `</select>`;
    return html;
}

function systemActionOptions(popupId, selected) {
    let html = `<select id="sys-action-option-${popupId}">`;
    systemActionOptionList.forEach(o => {
        // should it already be checked?
        if (selected && selected === o) {
            html += `<option value="${o}" selected=true>${o}</option>`;
        } else {
            html += `<option value="${o}">${o}</option>`;
        }
    });
    html += `</select>`;
    return html;
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
 * @returns {slideIds: string[], voiceCommands: <string, string>[], gestureCommands: <string, string>[], popupId: id}
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

function addCommandPopupHTML(id=null, display=false) {
    if (id === null) id = dynamicPopupID++;
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

    const displayMe = function(withoutRecompile=false) {
        const commandObj = withoutRecompile ? LIST_OF_COMMANDS.get(id) : compileCommands(id);
        document.getElementById(`custom-command-container-host-${id}`).innerHTML = displayCommand(commandObj).outerHTML;
        LIST_OF_COMMANDS.set(id, commandObj);
        addCommandPopupHTML(); // add one for next use
    }
    const saveF = function() {
        document.getElementById(`${SAVE_COMMAND_ID}-${id}`).addEventListener("click", (e) => {
            displayMe(false);
        });
    }

    document.getElementById('modal-custom-command').insertAdjacentHTML('beforeend', popup);
    document.getElementById('main-plus-button').setAttribute("data-bs-target", `#${COMMAND_MODAL_ID}-${id}`);
    document.getElementById('custom-command-container').insertAdjacentHTML('beforeend', `<div id="custom-command-container-host-${id}"></div>`);
    slideImgs.callbacks.concat(commandOptions.callbacks).forEach(f => f());
    saveF();
    if (display) displayMe(true);
}



/**
 * TOGGLE BETWEEN PAGES:
 */
const customize_script = function() {
    document.getElementById('customize-body').style.visibility = 'visible';
    document.getElementById('customize-body').style.display = 'block';

    document.getElementById('stage-container').style.visibility = 'hidden';
    document.getElementById('stage-container').style.display = 'none';

    document.getElementById('present-body').innerHTML = "";
    ui_srcs.forEach(url => {
        const s = document.getElementById(url);
        if (s) s.remove();
    });

    document.getElementById("reset-slides").addEventListener("click", function (e) {
        window.location.href = "index.html";
    });
    document.getElementById("full-present").addEventListener("click", function (e) {
        console.log(LIST_OF_COMMANDS);
        ui_script();
    });
}

const ui_body = `
    <div class="jumbotron" style="display: flex; justify-content: center; margin: 5px;" id="presentation-header">
        <div>
            <!-- <button class="btn" id="present-back-button">Controls</button> -->
            <!-- <button class="btn" id="present-fullscreen-button">Fullscreen</button> -->
            <!-- <h1>SmartSlides</h1> -->

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

    <div id="instructions" style="padding-top:10px; padding-left:20px; height: 600px; overflow: auto; position: relative; background-color:peachpuff">
        <div>
            <h3>Instructions</h3>
            <p>
                Say "start" to setup speech recognition and go to first slide of presentation. 
                <br>Press the 'h' key to toggle between this help screen and the slideshow.
                <br>Press the '<' key to go back to the custom controls.
            </p>
        </div>
        <div style="display: flex;">
            <div style="width: 50%;">
                <h3>Speech Commands</h3>
                <div>
                    <p> 
                    - next slide = "next"
                    <br> - previous slide = "previous"
                    <br> - undo - "jump to slide X"
                    <br> &emsp; - jumps to slide of integer number X (starting from 1)
                    <br> - start laser = "laser"
                    <br> &emsp; - stop laser = "stop laser", "turn off laser"
                    <br> - draw circle = "circle"
                    <br> &emsp; - sizes = "small," "big"
                    <br> &emsp; - colors = "green," "blue," "red"
                    <br> - draw custom sized circle = "start circle here"
                    <br> &emsp; - start position of circle / leftmost point of circle, laser must be on, color is red
                    <br> - draw custom sized circle = "end circle here"
                    <br> &emsp; - end position of circle / rightmost point of circle
                    <br> - start highlight mode = "turn on highlight", "pink highlight", "orange highlight", "yellow highlight"
                    <br> &emsp; - can see highlight cursor and define top left and bottom right corners for rectangle highlight
                    <br> &emsp; - top left corner of highlight = "start"
                    <br> &emsp; - bottom right corner of highlight = "stop"
                    <br> &emsp; - turn off highlight mode = "turn off highlight"
                    <br> - make text box = "text box"
                    <br> &emsp; - recognized speech will be transcribed in text box on slide
                    <br> - undo - "undo"
                    <br> &emsp; - erases the last addition (circle or highlight) added to the slide
                    </p>
                </div>
            </div>
            <div style="width: 50%;">
                <h3>Gesture Commands</h3>
                <div>
                    <p> 
                    - next slide = hand swipe right or up
                    <br> - previous slide = hand swipe left or down
                    <br>
                    <br>
                    <br> - laser position = hand position from leap sensor
                    <br> - hand position / cursor position is center of circle drawn
                    <br>
                    <br>
                    <br> - hand position / laser position controls circle start and end points
                    <br>
                    <br>
                    <br> - hand position / cursor position of cursor used to control highlight when specifying the top left and bottom right corners of the rectangle
                    <br>
                    <br>
                    <br>
                    <br> - hand position / cursor position of cursor used is where text box will be drawn
                    </p>
                </div>
            </div>
        </div>
    </div>
`;
const ui_srcs = [
    "app/main.js",
    "app/setupSpeech.js"
];
const ui_script = function() {
    // add the body html
    document.getElementById('present-body').innerHTML = ui_body;
    // and the approproate UI scripts
    ui_srcs.forEach(url => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = url;
        document.head.appendChild(script);
    });

    // make the presentation visible
    document.getElementById('customize-body').style.visibility = 'hidden';
    document.getElementById('customize-body').style.display = 'none';

    document.getElementById('stage-container').style.visibility = 'visible';
    document.getElementById('stage-container').style.display = 'block';

    document.getElementById("instructions").style.opacity = "0.0";
    // document.getElementById("stage").style.opacity = "0.0";
    fullscreen([]);
    document.onkeyup = function changeStyle() {
        var keycode = event.keyCode;
        console.log(keycode);

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

        if (keycode === 188 /** < */) {
            // go back to controls
            customize_script();
        }
    }
}
