export function setup() {
    const stage: HTMLElement|null = document.getElementById("stageArea");
    if (stage) {
        stage.style.display = 'none';
        stage.style.marginTop = "100px";
        stage.style.display = 'block';
    }
}

// Programmatically move to the prev slide
export function prev(controller: any) {
    console.log("prev");
    let event = new KeyboardEvent('keydown', {'charCode': 37 /*kKeyCode_LeftArrow*/});
    controller.handleKeyDownEvent(event);
}

// Programmatically move to the next slide
export function next(controller: any, x=1) {
    console.log("next");
    let event = new KeyboardEvent('keydown', {'charCode': 39 /*kKeyCode_RightArrow*/});
    controller.handleKeyDownEvent(event);
}

// Programmatically move to slide X
export function jumpSlide(controller: any, x: number) {
    console.log("jumpSlide");
    controller.jumpToSlide(x);
}

// Programmatically move to scene X
export function jumpScene(controller: any, x: number) {
    console.log("jumpScene");
    controller.jumpToScene(x);
}

// Programmatically rewinds X slides back
export function rewindSlide(controller: any, x: number) {
    console.log("rewindSlide");
    jumpSlide(controller, controller.currentSlideIndex - x);
}

// Programmatically rewinds X scenes back
export function rewindScene(controller: any, x: number) {
    console.log("rewindScene");
    jumpScene(controller, controller.currentSlideIndex - x);
}

// Programmatically fast-forwards X slides back
export function ffSlide(controller: any, x: number) {
    console.log("ffSlide");
    jumpSlide(controller, controller.currentSlideIndex + x);
}

// Programmatically fast-forwards  X scenes back
export function ffScene(controller: any, x: number) {
    console.log("ffScene");
    jumpScene(controller, controller.currentSlideIndex + x);
}
