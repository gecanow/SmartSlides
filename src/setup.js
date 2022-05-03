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

const COMMAND_HEIGHT = 300;

function setup() {
    console.log("...setting up...");

    document.body.appendChild(commandPopupHTML());
    document.body.appendChild(customCommand());

    console.log("...done...");
}

function customCommand() {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.display = "flex";
    wrapperDiv.style.width = "90%";
    wrapperDiv.style.height = `${COMMAND_HEIGHT}px`;
    wrapperDiv.style.backgroundColor = "gray";

    const m1 = document.createElement("p");
    m1.textContent = "On slide/s";
    m1.style.lineHeight = COMMAND_HEIGHT;
    wrapperDiv.appendChild(m1);

    const slideDeck = imageCheckboxHTML();
    wrapperDiv.appendChild(slideDeck);

    const m2 = document.createElement("p");
    m2.textContent = "when I";
    m2.style.lineHeight = `${COMMAND_HEIGHT}px`;
    wrapperDiv.appendChild(m2);

    const commandOptions = commandCheckboxHTML();
    wrapperDiv.appendChild(commandOptions);

    const m3 = document.createElement("p");
    m3.textContent = "do";
    m3.style.lineHeight = `${COMMAND_HEIGHT}px`;
    wrapperDiv.appendChild(m3);

    const actionOptions = commandCheckboxHTML();
    wrapperDiv.appendChild(actionOptions);

    return wrapperDiv;
}

function imageCheckboxHTML() {
    /**
        e.g.
        <ul>
            <li><input type="checkbox" id="cb1" />
              <label for="cb1"><img src="https://picsum.photos/seed/1/100" /></label>
            </li>
            ...
            <li><input type="checkbox" id="cb2" />
              <label for="cb2"><img src="https://picsum.photos/seed/2/100" /></label>
            </li>
        </ul>
     */
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.overflow = "auto";
    wrapperDiv.style.width = "350px";
    wrapperDiv.style.height = `${COMMAND_HEIGHT - 50}px`;
    wrapperDiv.style.backgroundColor = "lemonchiffon";

    const ul = document.createElement('ul');
    ul.style.width = "100%";
    ul.style.height = "100%";
    ul.style.margin = "0px";
    ul.style.padding = "0px";
    ul.style.display = "flex";
    ul.style.flexFlow = "row wrap";
    ul.style.justifyContent = "flex-start";

    fetch("/assets/header.json").then(function(response) {
        response.json().then(obj => {
            obj.slideList.forEach(slideID => {
                const li = document.createElement('li');
                li.style.width = "50%";
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
        })
    });

    wrapperDiv.appendChild(ul);
    return wrapperDiv;
}

function commandCheckboxHTML() {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.overflow = "auto";
    wrapperDiv.style.width = "350px";
    wrapperDiv.style.height = `${COMMAND_HEIGHT - 50}px`;
    wrapperDiv.style.backgroundColor = "pink";

    // Button to trigger modal popup
    const plusButton = document.createElement('button');
    plusButton.style.width = "22px";
    plusButton.style.height = "22px";
    plusButton.style.background = "transparent";
    plusButton.style.border = "0px";
    plusButton.style.padding = "0px";
    plusButton.style.lineHeight = "normal";

    plusButton.classList.add("btn", "button-primary");
    plusButton.setAttribute("data-bs-toggle", "modal");
    plusButton.setAttribute("data-bs-target", "#exampleModal");

    const plusIcon = document.createElement("img");
    plusIcon.src = "/nm/bootstrap-icons/icons/plus-square-fill.svg";
    plusIcon.style.width = "20px";
    plusIcon.style.height = "20px";
    plusIcon.style.marginTop = "-5px";
    plusIcon.style.margin = "0px";
    plusIcon.style.lineHeight = "normal";
    plusButton.appendChild(plusIcon);

    wrapperDiv.appendChild(plusButton);
    return wrapperDiv;
}

function sayCommand() {
    const label = document.createElement("label");
    label.style.display = "flex";
    label.innerHTML = `
    <p>say</p>
    <input id="speech-command"></input>
    `;
    return label;
}

function gestureCommand() {
    const label = document.createElement("label");
    label.style.display = "flex";
    label.innerHTML = `
    <p>do</p>
    <select id="gesture-options">
        <option value="gesture1">gesture1</option>
        <option value="gesture2">gesture2</option>
        <option value="gesture3">gesture3</option>
    </select>
    `;
    return label;
}

function commandPopupHTML() {
    // https://getbootstrap.com/docs/4.0/components/modal/
    const popup = `
    <!-- Modal -->
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Close
            </button>
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