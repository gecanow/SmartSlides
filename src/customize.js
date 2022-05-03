const COMMAND_HEIGHT = 300;
const COMMAND_MODAL_ID = "command-modal";
const ADD_SAY_BUTTON_ID = "SAY-BUTTON";
const ADD_GESTURE_BUTTON_ID = "GESTURE-BUTTON";
const SAVE_COMMAND_ID = "save-change";
const CUSTOM_COMMAND_ID = 'iscommand-'
const COMMAND_TYPE = function (str) { return str.split('-')[1]; };

/**
 * Setup the DOM once the other content has loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    grabThumbnails().then(() => {
        console.log(THUMBNAIL_IDS);
        setup();

        document.getElementById(SAVE_COMMAND_ID).addEventListener('click', (e) => {
            console.log("clicked saveButton");
        });
    });

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

    let followupCalls1 = commandPopupHTML();
    let followupCalls2 = customCommand();

    document.body.appendChild(followupCalls1.html);
    document.body.appendChild(followupCalls2.html);

    followupCalls1.callbacks.forEach(f => f());
    followupCalls2.callbacks.forEach(f => f());

    console.log("...done...");
}

function customCommand() {
    const wrapperDiv = document.createElement('div');
    // wrapperDiv.style.display = "flex";
    // wrapperDiv.style.width = "90%";
    // wrapperDiv.style.height = `${COMMAND_HEIGHT}px`;
    // wrapperDiv.style.backgroundColor = "gray";

    // Button to trigger modal popup
    const plusButton = document.createElement('button');
    plusButton.style.width = "50px";
    plusButton.style.height = "50px";
    plusButton.style.background = "transparent";
    plusButton.style.border = "0px";
    plusButton.style.padding = "0px";
    plusButton.style.lineHeight = "normal";

    plusButton.classList.add("btn", "button-primary");
    plusButton.setAttribute("data-bs-toggle", "modal");
    plusButton.setAttribute("data-bs-target", `#${COMMAND_MODAL_ID}`);

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
 * TODO
 * @returns TODO
 */
function imageCheckboxHTML() {
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
        input.id = `cb-${slideID}`;
        li.appendChild(input);

        const label = document.createElement('label');
        label.htmlFor = `cb-${slideID}`;

        const i = document.createElement("img");
        i.src = `/assets/${slideID}/thumbnail.jpeg`;

        label.appendChild(i);
        li.appendChild(label);

        ul.appendChild(li);
    });

    wrapperDiv.appendChild(ul);
    return {html: wrapperDiv, callbacks: []};
}

/**
 * TODO
 * @returns TODO
 */
function commandCheckboxHTML() {
    // A SAY COMMAND
    const sayButton = document.createElement('button');
    sayButton.style.background = "transparent";
    sayButton.style.border = "0px";
    sayButton.style.padding = "5px";
    sayButton.style.lineHeight = "normal";
    sayButton.id = ADD_SAY_BUTTON_ID;
    sayButton.innerHTML = "<p style='color:blue;'>speech</p>"

    // A GESTURE COMMAND
    const gestureButton = document.createElement('button');
    gestureButton.style.background = "transparent";
    gestureButton.style.border = "0px";
    gestureButton.style.padding = "5px";
    gestureButton.style.lineHeight = "normal";
    gestureButton.id = ADD_GESTURE_BUTTON_ID;
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
    div.id = "add-command-id";
    div.style.backgroundColor = "lemonchiffon";
    div.innerHTML = wrapper;

    // SPECIFY CALLBACKS
    const cb = function() {
        document.getElementById(ADD_SAY_BUTTON_ID).addEventListener('click', (e) => {
            console.log("clicked sayButton");
            const resp = sayCommand();
            document.getElementById("add-command-id").appendChild(resp.html);
            resp.callbacks.forEach(f => f());
        });

        document.getElementById(ADD_GESTURE_BUTTON_ID).addEventListener('click', (e) => {
            console.log("clicked gestureButton");
            const resp = gestureCommand();
            document.getElementById("add-command-id").appendChild(resp.html);
            resp.callbacks.forEach(f => f());
        });
    }
    return {html: div, callbacks: [cb]};
}

function sayCommand() {
    return commandTemplate(
            "say", 
            `<input id="speech-command" style="height: 80%; width: 40%;"></input>`, 
            systemActionOptions(),
            "peachpuff"
    );
}

function gestureCommand() {
    return commandTemplate(
        "do",
        gestureOptions(), 
        systemActionOptions(), 
        "rosybrown"
    );
}

let numCommands = 0;
function commandTemplate(type, cause, action, bgcolor) {
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
    label.id = `${CUSTOM_COMMAND_ID}${type}-${idNum}`;

    label.innerHTML = `
    <p style="width:120px;">When I ${type}</p>
    ${cause}
    <p style="width:200px;">the system should</p>
    ${action}
    ${trashHTML(`trash-${idNum}`)}
    `;

    const cb = function () {
        document.getElementById(`trash-${idNum}`).addEventListener('click', (e) => {
            console.log("clicked trash");
            document.getElementById(`${CUSTOM_COMMAND_ID}${type}-${idNum}`).remove();
        });
    }
    return {html: label, callbacks: [cb]};
}

function gestureOptions() {
    return `
    <select id="gesture-options" style="width: 40%;">
        <option value="gesture1">gesture1</option>
        <option value="gesture2">gesture2</option>
        <option value="gesture3">gesture3</option>
    </select>
    `;
}

function systemActionOptions() {
    return `
    <select id="sys-action-option">
        <option value="action1">action1</option>
        <option value="action2">action2</option>
        <option value="action3">action3</option>
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
function compileCommands() {
    let voiceCommands = {};
    let gestureCommands = {};

    document.querySelectorAll(`[id^=${CUSTOM_COMMAND_ID}]`).forEach(div => {
        let actions = div.getElementById("sys-action-option");
        let command = ""; let action = "";
        switch(COMMAND_TYPE(div)) {
            case "say":
                command = div.getElementById("speech-command").value;
                action = actions.options[actions.selectedIndex].value;
                voiceCommands.put(command, action);
                break;
            case "do":
                let commands = div.getElementById("gesture-options")
                command = commands.options[commands.selectedIndex].value;
                action = actions.options[actions.selectedIndex].value;
                voiceCommands.put(command, action);
                break;
            default:
                console.log("should not get here!!!");
        }
    });
}

function commandPopupHTML() {
    const slideImgs = imageCheckboxHTML();
    const commandOptions = commandCheckboxHTML();
    // https://getbootstrap.com/docs/4.0/components/modal/
    const popup = `
    <!-- Modal -->
    <div class="modal fade" id=${COMMAND_MODAL_ID} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Custom Command</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id=${SAVE_COMMAND_ID} type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    `;

    const saveF = function() {
        document.getElementById(SAVE_COMMAND_ID).addEventListener("click", (e) => {
            compileCommands();
        })
    }
    const div = document.createElement('div');
    div.innerHTML = popup;

    return {html: div, callbacks: slideImgs.callbacks.concat(commandOptions.callbacks).concat([saveF])};
}