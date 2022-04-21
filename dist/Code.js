"use strict";
function doGet() {
    return HtmlService.createHtmlOutputFromFile('src/Index');
}
// const ui = SlidesApp.getUi();
class Utils {
    static pId() { return SlidesApp.getActivePresentation().getId(); }
    static getPres() { return SlidesApp.openById(Utils.pId()); }
    static slides() { return Utils.getPres().getSlides(); }
    static currSlide() { return Utils.getPres().getSelection().getCurrentPage(); }
    static currSlideId() { return Utils.currSlide().getObjectId(); }
    static currSlideIndex() { return Utils.slides().findIndex((slide) => slide.getObjectId() === Utils.currSlideId()); }
}
function testMenuOption() {
    const ui = SlidesApp.getUi();
    ui.createMenu('SmartSlides')
        .addItem('Current presentation ID', 'displayCurrentPresId')
        .addItem('Current displayed slide ID', 'displayCurrentSlide')
        .addSeparator()
        .addItem('Advanced to next slide', 'nextSlide')
        .addItem('Revert to previous slide', 'prevSlide')
        .addItem('Draw circle', 'drawCircle')
        .addSeparator()
        .addItem('Open smart slides', 'openSidebar')
        .addToUi();
}
function getCurrentPresId() {
    return Utils.pId();
}
function displayCurrentPresId() {
    const ui = SlidesApp.getUi();
    ui.alert(`Presentation ID: ${Utils.pId()}`, ui.ButtonSet.OK);
}
function displayCurrentSlide() {
    const ui = SlidesApp.getUi();
    ui.alert(`You're on slide: ${Utils.currSlideId()}`, ui.ButtonSet.OK);
}
// TODO: skip skipped slides
function nextSlide() {
    Utils.slides()[Math.max(Utils.currSlideIndex() + 1, 0)].selectAsCurrentPage();
}
// TODO: skip skipped slides
function prevSlide() {
    Utils.slides()[Math.min(Utils.currSlideIndex() - 1, Utils.slides().length - 1)].selectAsCurrentPage();
}
function drawCircle() {
    var _a;
    // Create a new square textbox, using the supplied element ID.
    let elementId = 'ellipse_01';
    let pt350 = {
        magnitude: 50,
        unit: 'PT',
    };
    let shapeReq = [{
            createShape: {
                "objectId": elementId,
                "shapeType": 'ELLIPSE',
                "elementProperties": {
                    "pageObjectId": Utils.currSlideId(),
                    "size": {
                        "height": pt350,
                        "width": pt350,
                    },
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "translateX": 350,
                        "translateY": 100,
                        "unit": 'PT',
                    }
                },
            },
        }];
    // Execute the request.
    (_a = Slides.Presentations) === null || _a === void 0 ? void 0 : _a.batchUpdate({ requests: shapeReq }, Utils.pId());
}
function openSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('src/Index');
    SlidesApp.getUi()
        .showSidebar(html);
}
//# sourceMappingURL=Code.js.map