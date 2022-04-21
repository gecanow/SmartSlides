function doGet() {
  return HtmlService.createHtmlOutputFromFile('src/Index');
}

type Page = GoogleAppsScript.Slides.Page;
type Presentation = GoogleAppsScript.Slides.Presentation;
type Slide = GoogleAppsScript.Slides.Slide;

class Utils {
    static pId(): string { return SlidesApp.getActivePresentation().getId() }
    static getPres(): Presentation { return SlidesApp.openById(Utils.pId()); }
    static slides(): Slide[] { return Utils.getPres().getSlides(); }
    static currSlide(): Page { return Utils.getPres().getSelection().getCurrentPage(); }
    static currSlideId(): string { return Utils.currSlide().getObjectId(); }
    static currSlideIndex(): number { return Utils.slides().findIndex((slide) => slide.getObjectId() === Utils.currSlideId()); }
}

function testMenuOption(): void {
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

function getCurrentPresId(): string {
    return Utils.pId();
}

function displayCurrentPresId(): void {
    const ui = SlidesApp.getUi();
    ui.alert(`Presentation ID: ${Utils.pId()}`, ui.ButtonSet.OK);
}

function displayCurrentSlide(): void {
    const ui = SlidesApp.getUi();
    ui.alert(`You're on slide: ${Utils.currSlideId()}`, ui.ButtonSet.OK);
}

// TODO: skip skipped slides
function nextSlide(): void {
    Utils.slides()[Math.max(Utils.currSlideIndex()+1, 0)].selectAsCurrentPage();
}

// TODO: skip skipped slides
function prevSlide(): void {
    Utils.slides()[Math.min(Utils.currSlideIndex()-1, Utils.slides().length-1)].selectAsCurrentPage();
}

function drawCircle(): void {
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
    Slides.Presentations?.batchUpdate({requests: shapeReq}, Utils.pId());
}

function openSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('src/Index');
  SlidesApp.getUi()
      .showSidebar(html);
}