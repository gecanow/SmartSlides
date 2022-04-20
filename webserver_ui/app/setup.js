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
  mainContext.add(background);


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
      size: [1000, 700],
      properties: {
          backgroundColor: Colors.GREY,
          color: "white",
          border: "solid 1px black"
      },
  });
  tileTransformModifier = new StateModifier({
    transform: Transform.translate(gridOrigin[0]-100, gridOrigin[1], 0)
  });
  var tileModifier = new Modifier({
    opacity: 1.0
  });
  mainContext.add(tileTransformModifier).add(tileModifier).add(tile);

  startButton = new Surface({
    content: "Say START to begin presentation mode",
    size: [250, 150],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var startModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+275, gridOrigin[1]-80, 0)
  })
  mainContext.add(startModifier).add(startButton);

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
    transform: Transform.translate(gridOrigin[0]+50, gridOrigin[1]-160, 0)
  })
  mainContext.add(helpModifier).add(helpDescription);

  var commandsSurface = new Surface({
    content: "SPEECH AND GESTURE COMMANDS",
    size: [250, 150],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var commandsModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+275, gridOrigin[1]-20, 0)
  })
  mainContext.add(commandsModifier).add(commandsSurface);

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
    transform: Transform.translate(gridOrigin[0]+145, gridOrigin[1]-100, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+145, gridOrigin[1]-100, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]-75, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]-45, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+5, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+105, gridOrigin[1]+45, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+70, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+100, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+105, gridOrigin[1]+120, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+170, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+95, gridOrigin[1]+200, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);

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
    transform: Transform.translate(gridOrigin[0]+105, gridOrigin[1]+220, 0)
  })
  mainContext.add(speechModifier).add(speechSurface);


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
    transform: Transform.translate(gridOrigin[0]+545, gridOrigin[1]-100, 0)
  })
  mainContext.add(gestureModifier).add(gestureSurface);

  var gestureSurface = new Surface({
    content: "NEXT SLIDE: hand swipe left or up",
    size: [225, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+495, gridOrigin[1]-70, 0)
  })
  mainContext.add(gestureModifier).add(gestureSurface);

  var gestureSurface = new Surface({
    content: "PREVIOUS SLIDE: hand swipe right or down",
    size: [200, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+495, gridOrigin[1]-40, 0)
  })
  mainContext.add(gestureModifier).add(gestureSurface);

  var gestureSurface = new Surface({
    content: "DRAW CIRCLE: pointer finger circle gesture",
    size: [250, 25],
    properties: {
      backgroundColor: Colors.GREY,
      color: "black"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+495, gridOrigin[1]+10, 0)
  })
  mainContext.add(gestureModifier).add(gestureSurface);

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
  mainContext = Engine.createContext();
  background = new Surface({
    content: "",
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  mainContext.add(background);

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
      size: [1800, 800],
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
    opacity: 1.0
  });
  mainContext.add(tileTransformModifier).add(tileModifier).add(tile);

  startButton = new Surface({
    content: "Say Start to begin presentation mode",
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
  mainContext.add(startModifier).add(startButton);

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
