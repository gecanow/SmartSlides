// Import Famo.us dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Draggable = famous.modifiers.Draggable;
var GridLayout = famous.views.GridLayout;

// var tiles = [];
// var tileModifiers = [];
var gridOrigin = [350, 35];

var background, gestureCheckbox, speechCheckbox, startButton, otherFeedback, tile;
var tile, tileTransformModifier, cursorModifier;

// USER INTERFACE SETUP
var setupUserInterface = function() {
  var mainContext = Engine.createContext();
  background = new Surface({
    content: "<h1>SmartSlides</h1>",
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });


  mainContext.add(background);
  gestureCheckbox = new Surface({
    content: "-- Do not recogize gestures",
    size: [undefined, 150],
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var gestureModifier = new StateModifier({
    origin: [0.0, 0.0],
    align: [0.0, 0.35]
  })
  mainContext.add(gestureModifier).add(gestureCheckbox);


  speechCheckbox = new Surface({
    content: "-- Do not recognize speech",
    size: [undefined, 50],
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var speechModifier = new StateModifier({
    origin: [0.0, 0.0],
    align: [0.0, 0.4]
  })
  mainContext.add(speechModifier).add(speechCheckbox);

  startButton = new Surface({
    content: "-- Start presenting",
    size: [undefined, 50],
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var startModifier = new StateModifier({
    origin: [0.0, 0.0],
    align: [0.0, 0.45]
  })
  mainContext.add(startModifier).add(startButton);

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


  // Draw the cursor
  var cursorSurface = new Surface({
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
    opacity: 1.0,
    transform : function(){
      var cursorPosition = this.get('screenPosition');
      return Transform.translate(cursorPosition[0], cursorPosition[1], 0);
    }.bind(cursor)
  });
  mainContext.add(cursorOriginModifier).add(cursorModifier).add(cursorSurface);

};
