const COMMAND_HEIGHT = 300;
const COMMAND_MODAL_ID = "command-modal";
const ADD_SAY_BUTTON_ID = "SAY-BUTTON";
const ADD_GESTURE_BUTTON_ID = "GESTURE-BUTTON";

/**
 * Setup the DOM once the other content has loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
    grabThumbnails().then(() => {
        console.log(THUMBNAIL_IDS);
        setup();

        document.getElementById(ADD_SAY_BUTTON_ID).addEventListener('click', (e) => {
            console.log("clicked sayButton");
            document.getElementById("add-command-id").appendChild(sayCommand());
        });

        document.getElementById(ADD_GESTURE_BUTTON_ID).addEventListener('click', (e) => {
            console.log("clicked gestureButton");
            document.getElementById("add-command-id").appendChild(gestureCommand());
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

    document.body.appendChild(commandPopupHTML());
    document.body.appendChild(customCommand());

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
    return wrapperDiv;
}

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
    return wrapperDiv;
}

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
    return div;
}

function sayCommand() {
    return commandTemplate("say", `<input id="speech-command" style="height: 80%; width: 40%;"></input>`, systemActionOptions());
}

function gestureCommand() {
    return commandTemplate("do", gestureOptions(), systemActionOptions());
}

function commandTemplate(type, cause, action) {
    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.justifyContent = "flex-start";
    label.style.alignItems = "center";
    label.style.width = "95%";
    label.style.backgroundColor = "rosybrown";
    label.style.margin = "10px";
    label.style.padding = "4px";
    label.style.borderRadius = "4px";
    label.style.lineHeight = "normal";
    label.innerHTML = `
    <p style="width:120px;">When I ${type}</p>
    ${cause}
    <p style="width:200px;">the system should</p>
    ${action}
    `;
    return label;
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
    <select id="gesture-options">
        <option value="action1">action1</option>
        <option value="action2">action2</option>
        <option value="action3">action3</option>
    </select>
    `;
}

function commandPopupHTML() {
    // https://getbootstrap.com/docs/4.0/components/modal/
    console.log(imageCheckboxHTML().innerHTML);
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
                ${imageCheckboxHTML().outerHTML}
                <p>Execute the following commands:</p>
                ${commandCheckboxHTML().outerHTML}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = popup;
    return div;
}