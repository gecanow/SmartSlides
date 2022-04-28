export function setup() {
    const stage = document.getElementById("stageArea");
    if (stage) {
        stage.style.display = 'none';
        stage.style.marginTop = "100px";
        stage.style.display = 'block';
    }
}
// Programmatically move to the prev slide
export function prev(controller) {
    console.log("prev");
    let event = new KeyboardEvent('keydown', { 'charCode': 37 /*kKeyCode_LeftArrow*/ });
    controller.handleKeyDownEvent(event);
}
// Programmatically move to the next slide
export function next(controller) {
    console.log("next");
    let event = new KeyboardEvent('keydown', { 'charCode': 39 /*kKeyCode_RightArrow*/ });
    controller.handleKeyDownEvent(event);
}
// Programmatically move to slide X
export function jumpSlide(controller, x) {
    console.log("jumpSlide");
    controller.jumpToSlide(x);
}
// Programmatically move to scene X
export function jumpScene(controller, x) {
    console.log("jumpScene");
    controller.jumpToScene(x);
}
//# sourceMappingURL=presentation-control.js.map