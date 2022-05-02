// Import Famo.us dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Draggable = famous.modifiers.Draggable;
var GridLayout = famous.views.GridLayout;


var gridOrigin = [350, 35];

var background, startButton, otherFeedback, tile, mainContext;
var tile, tileTransformModifier, cursorModifier, cursorSurface;
var testingTextOutput, testingModifier, testingOpacityModifier;

var opacityModifiers = [];

// USER INTERFACE SETUP
var setupUserInterface = function() {
  mainContext = Engine.createContext();
  background = new Surface({
    content: "<h1>SmartSlides</h1>",
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var backgroundModifier = new Modifier({
    opacity: 0.0
  });
  // opacityModifiers.push(backgroundModifier);
  mainContext.add(backgroundModifier).add(background);

  otherFeedback = new Surface({
    content: "",
    size: [undefined, 50],
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var otherStateModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 1.0]
  });
  var otherModifier = new Modifier({
    opacity: 1.0
  });
  // opacityModifiers.push(otherModifier);
  mainContext.add(otherStateModifier).add(otherModifier).add(otherFeedback);


  // // Draw the presentation title slide
  tile = new Surface({
      size: [1000, 550],
      properties: {
          backgroundColor: Colors.GREY,
          color: "white",
          border: "solid 1px black"
      },
  });
  tileTransformModifier = new StateModifier({
    transform: Transform.translate(gridOrigin[0]-100, gridOrigin[1]+150, 0)
  });
  var tileModifier = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(tileModifier);
  mainContext.add(tileTransformModifier).add(tileModifier).add(tile);

  startButton = new Surface({
    content: "Say START to begin presentation mode",
    size: [250, 50],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
      // border: "solid 1px black"
    }
  });
  var startModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+275, gridOrigin[1]-80, 0)
  });
  var startOpacity = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(startOpacity);
  mainContext.add(startModifier).add(startOpacity).add(startButton);

  var helpDescription = new Surface({
    content: "--------------------------------------------------------------------------------------------------------------------------------",
    size: [700, 10],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var helpModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+50, gridOrigin[1]-85, 0)
  });
  var helpOpacity = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(helpOpacity);
  mainContext.add(helpModifier).add(helpOpacity).add(helpDescription);

  var commandsSurface = new Surface({
    content: "SPEECH AND GESTURE COMMANDS",
    size: [235, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var commandsModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+275, gridOrigin[1]-50, 0)
  });
  var opacity1 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity1);
  mainContext.add(commandsModifier).add(opacity1).add(commandsSurface);

  var speechSurface = new Surface({
    content: "----SPEECH----",
     // next slide, next\n previous slide, previous\n laser, start laser, laser pointer\n stop laser, stop\n highlight\n stop highlight, stop\n circle, draw circle",
    size: [100, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+145, gridOrigin[1]-25, 0)
  });
  var opacity2 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity2);
  mainContext.add(speechModifier).add(opacity2).add(speechSurface);

  // var speechSurface = new Surface({
  //   content: "----SPEECH----",
  //    // next slide, next\n previous slide, previous\n laser, start laser, laser pointer\n stop laser, stop\n highlight\n stop highlight, stop\n circle, draw circle",
  //   size: [100, 25],
  //   properties: {
  //     backgroundColor: Colors.GREY,
  //     color: "black"
  //   }
  // });
  // var speechModifier = new StateModifier({
  //   origin: [0.0, 1.0],
  //   align: [0.0, 0.4],
  //   transform: Transform.translate(gridOrigin[0]+145, gridOrigin[1]-100, 0)
  // });
  // var opacity3 = new Modifier({
  //   opacity: 0.0
  // });
  // opacityModifiers.push(opacity3);
  // mainContext.add(speechModifier).add(opacity3).add(speechSurface);

  var speechSurface = new Surface({
    content: "NEXT SLIDE: next, next slide",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1], 0)
  });
  var opacity4 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity4);
  mainContext.add(speechModifier).add(opacity4).add(speechSurface);

  var speechSurface = new Surface({
    content: "PREVIOUS SLIDE: previous, previous slide",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+30, 0)
  });
  var opacity5 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity5);
  mainContext.add(speechModifier).add(opacity5).add(speechSurface);

  var speechSurface = new Surface({
    content: "LASER POINTER: laser, start laser, laser pointer",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+65, 0)
  });
  var opacity6 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity6);
  mainContext.add(speechModifier).add(opacity6).add(speechSurface);

  var speechSurface = new Surface({
    content: "--uses Leap sensor hand position to control",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+105, gridOrigin[1]+95, 0)
  });
  var opacity7 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity7);
  mainContext.add(speechModifier).add(opacity7).add(speechSurface);

  var speechSurface = new Surface({
    content: "STOP LASER: stop laser, stop",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+125, 0)
  });
  var opacity8 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity8);
  mainContext.add(speechModifier).add(opacity8).add(speechSurface);

  var speechSurface = new Surface({
    content: "HIGHLIGHT: highlight, start highlight",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+155, 0)
  });
  var opacity9 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity9);
  mainContext.add(speechModifier).add(opacity9).add(speechSurface);

  var speechSurface = new Surface({
    content: "--uses hand position at start and end to create highlight box",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+105, gridOrigin[1]+185, 0)
  });
  var opacity10 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity10);
  mainContext.add(speechModifier).add(opacity10).add(speechSurface);

  var speechSurface = new Surface({
    content: "STOP HIGHLIGHT: stop highlight, stop",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+225, 0)
  });
  var opacity12 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity12);
  mainContext.add(speechModifier).add(opacity12).add(speechSurface);

  var speechSurface = new Surface({
    content: "DRAW CIRCLE: circle, draw circle",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+255, 0)
  });
  var opacity13 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity13);
  mainContext.add(speechModifier).add(opacity13).add(speechSurface);

  var speechSurface = new Surface({
    content: "--uses hand position to center circle",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+105, gridOrigin[1]+285, 0)
  });
  var opacity14 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity14);
  mainContext.add(speechModifier).add(opacity14).add(speechSurface);


  var gestureSurface = new Surface({
    content: "---GESTURE---",
    size: [100, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+545, gridOrigin[1]-25, 0)
  });
  var opacity15 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity15);
  mainContext.add(gestureModifier).add(opacity15).add(gestureSurface);

  var gestureSurface = new Surface({
    content: "NEXT SLIDE: hand swipe right with right hand",
    size: [225, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+495, gridOrigin[1]+10, 0)
  });
  var opacity16 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity16);
  mainContext.add(gestureModifier).add(opacity16).add(gestureSurface);

  var gestureSurface = new Surface({
    content: "PREVIOUS SLIDE: hand swipe left with left hand",
    size: [200, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+495, gridOrigin[1]+40, 0)
  });
  var opacity17 = new Modifier({
    opacity: 1.0
  });
  opacityModifiers.push(opacity17);
  mainContext.add(gestureModifier).add(opacity17).add(gestureSurface);

  // var gestureSurface = new Surface({
  //   content: "DRAW CIRCLE: pointer finger circle gesture",
  //   size: [250, 25],
  //   properties: {
  //     backgroundColor: Colors.GREY,
  //     color: "black"
  //   }
  // });
  // var gestureModifier = new StateModifier({
  //   origin: [0.0, 1.0],
  //   align: [0.0, 0.4],
  //   transform: Transform.translate(gridOrigin[0]+495, gridOrigin[1]+10, 0)
  // });
  // var opacity18 = new Modifier({
  //   opacity: 1.0
  // });
  // opacityModifiers.push(opacity18);
  // mainContext.add(gestureModifier).add(opacity18).add(gestureSurface);

  // Draw the cursor
  cursorSurface = new Surface({
    size : [CURSORSIZE, CURSORSIZE],
    properties : {
        backgroundColor: Colors.RED,
        borderRadius: CURSORSIZE/2 + 'px',
        pointerEvents : 'none',
        zIndex: 1
    }
  });
  var cursorOriginModifier = new StateModifier({origin: [0.5, 0.5]});
  cursorModifier = new Modifier({
    opacity: 0.0,
    transform : function(){
      var cursorPosition = this.get('screenPosition');
      return Transform.translate(cursorPosition[0], cursorPosition[1], 0);
    }.bind(cursor)
  });
  mainContext.add(cursorOriginModifier).add(cursorModifier).add(cursorSurface);

};

///////
/// Switch slide UI
////////
var switchSlideUI = function() {
  // mainContext = Engine.createContext();
  background = new Surface({
    content: "",
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  // mainContext.add(background);

  otherFeedback = new Surface({
    content: "",
    size: [undefined, 50],
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var otherModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 1.0]
  })
  mainContext.add(otherModifier).add(otherFeedback);


  // // Draw the presentation title slide
  tile = new Surface({
      size: [1900, 800],
      properties: {
          backgroundColor: "black",
          color: "white",
          border: "solid 1px black"
      },
  });
  tileTransformModifier = new StateModifier({
    transform: Transform.translate(-250, -35, 0)
  });
  var tileModifier = new Modifier({
    opacity: 0.0
  });
  // mainContext.add(tileTransformModifier).add(tileModifier).add(tile);

  startButton = new Surface({
    content: "",
    size: [200, 150],
    properties: {
      backgroundColor: "black",
      color: "white"
    }
  });
  var startModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+300, gridOrigin[1], 0)
  })
  // mainContext.add(startModifier).add(startButton);

  // Draw the cursor
  cursorSurface = new Surface({
    size : [CURSORSIZE, CURSORSIZE],
    properties : {
        backgroundColor: Colors.RED,
        borderRadius: CURSORSIZE/2 + 'px',
        pointerEvents : 'none',
        zIndex: 1
    }
  });
  var cursorOriginModifier = new StateModifier({origin: [0.5, 0.5]});
  cursorModifier = new Modifier({
    opacity: 0.0,
    transform : function(){
      var cursorPosition = this.get('screenPosition');
      return Transform.translate(cursorPosition[0], cursorPosition[1], 0);
    }.bind(cursor)
  });
  mainContext.add(cursorOriginModifier).add(cursorModifier).add(cursorSurface);

};
