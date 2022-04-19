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
  // gestureCheckbox = new Surface({
  //   content: "-- Do not recogize gestures",
  //   size: [undefined, 150],
  //   properties: {
  //     backgroundColor: "rgb(34, 34, 34)",
  //     color: "white"
  //   }
  // });
  // var gestureModifier = new StateModifier({
  //   origin: [0.0, 0.0],
  //   align: [0.0, 0.35]
  // })
  // mainContext.add(gestureModifier).add(gestureCheckbox);
  //
  //
  // speechCheckbox = new Surface({
  //   content: "-- Do not recognize speech",
  //   size: [undefined, 50],
  //   properties: {
  //     backgroundColor: "rgb(34, 34, 34)",
  //     color: "white"
  //   }
  // });
  // var speechModifier = new StateModifier({
  //   origin: [0.0, 0.0],
  //   align: [0.0, 0.4]
  // })
  // mainContext.add(speechModifier).add(speechCheckbox);

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
    content: "Say Start to begin presentation mode",
    size: [200, 150],
    properties: {
      backgroundColor: Colors.GREY,
      color: "white"
    }
  });
  var startModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 0.4],
    transform: Transform.translate(gridOrigin[0]+300, gridOrigin[1], 0)
  })
  mainContext.add(startModifier).add(startButton);

  // testingTextOutput = new Surface({
  //   content: "",
  //   size: [undefined, 100],
  //   properties: {
  //     // backgroundColor: "black",
  //     color: "white"
  //   }
  // });
  // var testingModifier = new StateModifier({
  //   origin: [0.0, 0.0],
  //   align: [0.0, 0.4]
  // });
  // var testingOpacityModifier = new Modifier({
  //   opacity: 0.0;
  // });
  // mainContext.add(testingModifier).add(testingOpacityModifier).add(testingTextOutput);

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

// var setupUserInterface = function() {
//   testingTextOutput = new Surface({
//     content: "",
//     size: [undefined, 100],
//     properties: {
//       backgroundColor: "black",
//       color: "white"
//     }
//   });
//   var testingModifier = new StateModifier({
//     origin: [0.0, 0.0],
//     align: [0.0, 0.4]
//   });
//   var testingOpacityModifier = new Modifier({
//     opacity: 0.0;
//   });
//   mainContext.add(testingModifier).add(testingOpacityModifier).add(testingTextOutput);
// }
